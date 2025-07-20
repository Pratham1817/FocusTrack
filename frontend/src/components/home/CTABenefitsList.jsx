import { CheckCircleOutlined } from "@ant-design/icons";
import { CTA_BENEFITS } from "../../utils/constants";

const CTABenefitsList = () => {
  return (
    <ul className="my-8 flex flex-wrap justify-center gap-6">
      {CTA_BENEFITS.map((benefit, index) => (
        <li key={index} className="flex items-center gap-2" role="listitem">
          <CheckCircleOutlined
            className="h-5 w-5 pt-0.5 text-green-300"
            aria-hidden="true"
          />
          <span className="text-sm opacity-65 md:text-base">{benefit}</span>
        </li>
      ))}
    </ul>
  );
};

export default CTABenefitsList;
