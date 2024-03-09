import { ReactNode } from "react";
import "./Section.css";

interface SectionProps {
  title: string;
  gradientStart: string;
  gradientEnd: string;
  idName: string;
  children: ReactNode;
}

const Section: React.FC<SectionProps> = ({
  title,
  gradientStart,
  gradientEnd,
  idName,
  children,
}) => {
  return (
    <div
      className="section-format"
      style={{
        background: `linear-gradient(180deg, ${gradientStart} 0%, ${gradientEnd} 100%)`,
      }}
      id={idName}>
      <h2 className="header-format hidden-header">{title}</h2>
      {children}
    </div>
  );
};

export default Section;
