import classNames from "classnames";

export default function mergeTailwindClasses(classes: Record<string, boolean>) {
  return classNames(classes);
}
