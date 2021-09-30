import classcat from "classcat";
import styles from "./TempoBadge.module.scss";
import { Tempo } from "../../types/songs";

type Props = {
  tempo: Tempo;
};

const labels: Record<Tempo, string> = {
  [Tempo.FAST]: "Fast",
  [Tempo.MEDIUM]: "Medium",
  [Tempo.SLOW]: "Slow",
};

const TempoBadge: React.FC<Props> = ({ tempo }) => {
  const className = classcat([
    styles["tempo-badge"],
    {
      [styles["tempo-badge--fast"]]: tempo === Tempo.FAST,
      [styles["tempo-badge--medium"]]: tempo === Tempo.MEDIUM,
      [styles["tempo-badge--slow"]]: tempo === Tempo.SLOW,
    },
  ]);
  return <div className={className}>{labels[tempo]}</div>;
};

export default TempoBadge;
