import React, { useMemo } from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface Section {
  percentage: number;
  color: string;
  label: string;
}

interface DonutChartProps {
  sections: Section[];
  radius: number;
  strokeWidth: number;
  textColor: string;
  backgroundColor?: string;
}

const DonutChart: React.FC<DonutChartProps> = ({
  sections,
  radius,
  strokeWidth,
  textColor,
  backgroundColor = "#f0f0f0",
}) => {
  const normalizedSections = useMemo(() => {
    const total = sections.reduce(
      (sum, section) => sum + Math.max(0, section.percentage),
      0
    );
    if (total === 0)
      return sections.map((section) => ({ ...section, percentage: 0 }));
    return sections.map((section) => ({
      ...section,
      percentage: (Math.max(0, section.percentage) / total) * 100,
    }));
  }, [sections]);

  const chartRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * chartRadius;

  const renderSections = () => {
    let cumulativePercentage = 0;
    return normalizedSections.map((section, index) => {
      const strokeDasharray = `${
        (section.percentage / 100) * circumference
      } ${circumference}`;
      const rotation = (cumulativePercentage / 100) * 360;
      cumulativePercentage += section.percentage;

      return (
        <Circle
          key={index}
          cx={radius}
          cy={radius}
          r={chartRadius}
          fill="none"
          stroke={section.color}
          strokeWidth={strokeWidth}
          strokeDasharray={strokeDasharray}
          rotation={rotation}
          origin={`${radius}, ${radius}`}
        />
      );
    });
  };

  const renderLegend = () => {
    return normalizedSections.map((section, index) => (
      <View key={index} className="flex flex-row items-center mb-1">
        <View
          className="w-5 h-5 mr-2"
          style={{ backgroundColor: section.color }}
        />
        <Text className="text-base" style={{ color: textColor }}>
          {section.label} - {section.percentage.toFixed(1)}%
        </Text>
      </View>
    ));
  };

  const isEmpty = normalizedSections.every(
    (section) => section.percentage === 0
  );

  if (isEmpty) {
    return (
      <View className="flex items-center justify-center h-52">
        <Text className="text-base" style={{ color: textColor }}>
          No data to display
        </Text>
      </View>
    );
  }

  return (
    <View className="flex items-center p-5">
      <View className="mb-5">
        <Svg
          width={radius * 2}
          height={radius * 2}
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        >
          <Circle
            cx={radius}
            cy={radius}
            r={chartRadius}
            fill="none"
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
          />
          {renderSections()}
        </Svg>
      </View>
      <View className="flex items-start">{renderLegend()}</View>
    </View>
  );
};

export default DonutChart;
