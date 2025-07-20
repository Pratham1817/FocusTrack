import { CheckCircleOutlined } from "@ant-design/icons";
import { HERO_BENEFITS } from "../../utils/constants";

const HeroBenefitsList = () => {
  return (
    <ul className="flex flex-wrap gap-4" role="list" aria-label="Key benefits">
      {HERO_BENEFITS.map((benefit) => (
        <li key={benefit} className="flex items-center gap-2" role="listitem">
          <CheckCircleOutlined
            className="h-5 w-5 pt-0.5 text-green-500"
            aria-hidden="true"
          />
          <span className="text-gray-700">{benefit}</span>
        </li>
      ))}
    </ul>
  );
};

export default HeroBenefitsList;
