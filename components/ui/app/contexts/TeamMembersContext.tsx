import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import React from "react";
import { CompleteTeamMembers } from "../../../../prisma/zod/teammembers";
import { getMembersList } from "@/lib/members/queries";
import { deleteMember, updateMember } from "@/lib/members/mutations";

type TMembersTable = {
  data: CompleteTeamMembers[];
  isAddOpen: boolean;
  memberToEdit: CompleteTeamMembers | undefined;
  isGettingMembers: boolean;
  openNew: (value: boolean) => void;
  setEditing: (member: CompleteTeamMembers | undefined) => void;
  delMember: (id: string) => void;
  openEdit: (value: boolean) => void;
  isEditOpen: boolean;
  update: (
    id: string,
    propsToChange: Partial<CompleteTeamMembers>
  ) => Promise<void>;
};
const teamMembersContext = createContext<TMembersTable>({
  data: [],
  isAddOpen: false,
  memberToEdit: undefined,
  isGettingMembers: true,
  openNew: (value) => {},
  setEditing: (value) => {},
  openEdit: (value) => {},
  delMember: (id) => {},
  isEditOpen: false,
  update: (id: string, propsToChange: Partial<CompleteTeamMembers>) =>
    new Promise(() => {
      let a = 0;
    }),
});

export const useTeamMembersContext = () => {
  const context = useContext(teamMembersContext);
  if (context === undefined) {
    throw new Error(
      "useTeamMembersContext must be used within a icon team members provider"
    );
  }
  return context;
};

const TeamMembersProvider = ({ children }: React.PropsWithChildren) => {
  const [members, setMembers] = useState<CompleteTeamMembers[]>([]);
  const [isGettingMembers, setIsGettingMembers] = useState(true);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState<CompleteTeamMembers>();
  const [editModalIsOpen, setEditModalIsOpen] = useState<boolean>(false);

  const setEditing = useCallback((member: CompleteTeamMembers | undefined) => {
    setMemberToEdit(member);
  }, []);
  const openNew = useCallback((value: boolean) => {
    setCreateModalIsOpen(value);
  }, []);
  const openEdit = useCallback((value: boolean) => {
    setEditModalIsOpen(value);
  }, []);
  const getMembers = useCallback(async () => {
    try {
      const members = (await getMembersList({
        skip: 0,
        take: 0,
      })) as {
        error: boolean;
        message: string[];
        payload: { workers: CompleteTeamMembers[] };
      };
      setMembers(members.payload.workers);
    } catch {}
  }, []);

  const update = useCallback(
    async (id: string, propsToChange: Partial<CompleteTeamMembers>) => {
      await updateMember(id, propsToChange).then(() => getMembers());
    },
    [getMembers]
  );

  const delMember = useCallback(
    async (id: string) => {
      deleteMember(id).then(() => getMembers());
    },
    [getMembers]
  );

  useEffect(() => {
    getMembers()
      .then(() => setIsGettingMembers(false))
      .catch(() => setIsGettingMembers(false));
  }, [createModalIsOpen, getMembers, memberToEdit, editModalIsOpen]);
  const value: TMembersTable = useMemo(
    () => ({
      data: members,
      isGettingMembers,
      memberToEdit,
      setEditing,
      openNew,
      isAddOpen: createModalIsOpen,
      delMember,
      isEditOpen: editModalIsOpen,
      openEdit,
      update,
    }),
    [
      members,
      isGettingMembers,
      memberToEdit,
      setEditing,
      openNew,
      createModalIsOpen,
      delMember,
      openEdit,
      editModalIsOpen,
      update,
    ]
  );

  return (
    <teamMembersContext.Provider value={value}>
      {children}
    </teamMembersContext.Provider>
  );
};
export default TeamMembersProvider;
