import { useMemo } from "react";
import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { TwoButtonSubtitlePageHeaderComponent } from "@ui/components/headers/PageHeaderComponent";
import { VerticalListContainer } from "@ui/containers/VerticalListContainer";
import { SectionHeaderComponent } from "@ui/components/headers/SectionHeaderComponent";
import { IconButtonComponent } from "@ui/components/ButtonComponent";
import { IconSubTextListItemComponent } from "@ui/components/ListItemComponent";
import { IconRes } from "@ui/utils/IconRes";
import { ICON } from "@ui/constants/icons";
import { CategoryIcon } from "../../ui/CategoryIcon";

export function CategorySelectionPage({
  categories,
  onSelect,
  onBack,
  onCreateNew,
}) {
  const groupedCategories = useMemo(() => {
    return categories.reduce((acc, cat) => {
      const groupName = cat.group_name;
      if (!acc[groupName]) acc[groupName] = [];
      acc[groupName].push(cat);
      return acc;
    }, {});
  }, [categories]);

  return (
    <OneColumnTemplate
      header={
        <TwoButtonSubtitlePageHeaderComponent
          leftButton={
            <IconButtonComponent
              icon={<IconRes icon={ICON.BACK} />}
              onClick={onBack}
            />
          }
          title="Select category"
          rightButton={
            <IconButtonComponent
              icon={<IconRes icon={ICON.ADD} />}
              onClick={onCreateNew}
            />
          }
        />
      }
    >
      {Object.entries(groupedCategories).map(([groupName, items]) => (
        <VerticalListContainer
          key={groupName}
          isElevated={true}
          header={<SectionHeaderComponent title={groupName} />}
        >
          {items.map((category) => (
            <IconSubTextListItemComponent
              key={category.id}
              text={category.name}
              onClick={() => {
                onSelect(category);
                onBack();
              }}
              icon={
                <CategoryIcon color={category.color} icon={category.icon} />
              }
            />
          ))}
        </VerticalListContainer>
      ))}
    </OneColumnTemplate>
  );
}
