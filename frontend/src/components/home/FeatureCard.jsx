import { CheckSquareOutlined } from "@ant-design/icons";

const FeatureCard = ({ IconComponent, feature, colors }) => {
  return (
    <article
      className={`rounded-2xl border-2 p-6 transition-all duration-300 ${colors.bg} ${colors.border} ${colors.hover} group focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2`}
    >
      <div className="mb-4 flex items-center">
        <div
          className={`rounded-lg p-3 ${colors.bg} mr-4 transition-transform duration-300 group-hover:scale-110`}
        >
          <IconComponent
            className={`h-6 w-6 pl-1 ${colors.icon}`}
            aria-hidden="true"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
      </div>

      <p className="mb-4 leading-relaxed text-gray-600">
        {feature.description}
      </p>

      <ul
        className="space-y-2"
        role="list"
        aria-label={`${feature.title} features`}
      >
        {feature.highlights.map((highlight, highlightIndex) => (
          <li
            key={highlightIndex}
            className="flex items-center text-sm text-gray-700"
            role="listitem"
          >
            <CheckSquareOutlined
              className={`mr-2 h-4 w-4 ${colors.icon}`}
              aria-hidden="true"
            />
            {highlight}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default FeatureCard;
