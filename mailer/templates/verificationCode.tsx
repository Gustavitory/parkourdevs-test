import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Link } from "@react-email/link";
import { Container } from "@react-email/container";
import { Section } from "@react-email/section";

export const ConfirmationEmail = ({
  userName,
  code,
}: {
  userName: string;
  code: string;
}) => {
  return (
    <Html lang="es">
      <Container>
        <Text
          style={{
            fontSize: "28px",
            color: "#777",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Parkour
        </Text>
        <Text>¡Hi {userName}!</Text>
        <Text>This is your verification code:</Text>

        <Text
          style={{
            fontSize: "20px",
            fontWeight: "bolder",
            textAlign: "center",
          }}
        >
          {code}
        </Text>
      </Container>
    </Html>
  );
};
