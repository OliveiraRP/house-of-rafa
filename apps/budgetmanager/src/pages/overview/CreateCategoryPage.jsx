import { useState, useMemo } from "react";
import { useViewNavigation } from "@ui/hooks/useViewNavigation";
import { ViewSwitcher } from "@ui/animations/ViewSwitcher";
import { OneColumnTemplate } from "@ui/templates/OneColumnTemplate";
import { TwoButtonSubtitlePageHeaderComponent } from "@ui/components/headers/PageHeaderComponent";
import { VerticalListContainer } from "@ui/containers/VerticalListContainer";
import { EmptyBoxContainer } from "@ui/containers/BoxContainer";
import { SectionHeaderComponent } from "@ui/components/headers/SectionHeaderComponent";
import { IconButtonComponent } from "@ui/components/ButtonComponent";
import { GridContainer } from "@ui/containers/GridContainer";
import {
  TextListItemComponent,
  SwitchListItemComponent,
  IconSubTextListItemComponent,
  InputListItemComponent,
} from "@ui/components/ListItemComponent";
import { HorizontalColorPickerComponent } from "@ui/components/ColorPickerComponent";
import { IconRes } from "@ui/utils/IconRes";
import { ICON } from "@ui/constants/icons";
import { WALLET_ICONS } from "../../constants/icons";
import { PALETTE_LIST } from "../../constants/colors";
import { CategoryIcon } from "../../ui/CategoryIcon";
import { CategoryDetailsCard } from "../../ui/WalletDetailsCard";
import { TypeSelector } from "../../ui/TransactionHeader";
import {
  useCreateCategory,
  useCategoryGroups,
  useCreateCategoryGroup,
} from "../../hooks/useCategories";

export function CreateCategoryPage({ onBack }) {
  const { view, direction, navigateTo } = useViewNavigation(0);
  const createMutation = useCreateCategory();
  const createGroupMutation = useCreateCategoryGroup();
  const { data: allGroups = [] } = useCategoryGroups();

  const [categoryData, setCategoryData] = useState({
    name: "New Category",
    icon: WALLET_ICONS.at(0),
    category_group_id: null,
    excludeFromOverview: false,
  });

  const [newGroupData, setNewGroupData] = useState({
    name: "",
    type: "expense",
    color: PALETTE_LIST[0].id,
  });

  const selectedGroup = useMemo(() => {
    if (categoryData.category_group_id) {
      return allGroups.find((g) => g.id === categoryData.category_group_id);
    }
    return allGroups[0];
  }, [allGroups, categoryData.category_group_id]);

  const categorizedGroups = useMemo(() => {
    const types = ["expense", "income", "transfer"];
    return types.map((type) => ({
      type,
      groups: allGroups.filter((g) => g.type === type),
    }));
  }, [allGroups]);

  const handleSubmitCategory = () => {
    const finalGroupId = categoryData.category_group_id || allGroups[0]?.id;

    const payload = {
      name: categoryData.name,
      icon: categoryData.icon,
      category_group_id: finalGroupId,
      excludeFromOverview: categoryData.excludeFromOverview,
    };

    createMutation.mutate(payload, {
      onSuccess: onBack,
      onError: (err) => alert(err.message),
    });
  };

  const handleSubmitCategoryGroup = () => {
    const selectedPaletteColor = PALETTE_LIST.find(
      (c) => c.id === newGroupData.color
    );

    const payload = {
      name: newGroupData.name,
      type: newGroupData.type,
      color: selectedPaletteColor?.hex,
    };

    createGroupMutation.mutate(payload, {
      onSuccess: (createdGroup) => {
        setCategoryData((prev) => ({
          ...prev,
          category_group_id: createdGroup.id,
        }));
        navigateTo(1);
        setNewGroupData({
          name: "",
          type: "expense",
          color: PALETTE_LIST[0].id,
        });
      },
      onError: (err) => alert(err.message),
    });
  };

  return (
    <ViewSwitcher view={view} direction={direction}>
      {(() => {
        switch (view) {
          case 0:
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
                    title="Create category"
                    rightButton={
                      <IconButtonComponent
                        icon={<IconRes icon={ICON.ADD} />}
                        onClick={handleSubmitCategory}
                        disabled={
                          !categoryData.name || createMutation.isPending
                        }
                        style={{
                          backgroundColor: "var(--color-accent-primary)",
                        }}
                      />
                    }
                  />
                }
              >
                <CategoryDetailsCard
                  name={categoryData.name}
                  icon={categoryData.icon}
                  groupColor={selectedGroup?.color}
                  onIconClick={() => navigateTo(2)}
                  onNameChange={(newName) =>
                    setCategoryData((prev) => ({ ...prev, name: newName }))
                  }
                />

                <VerticalListContainer isElevated={true}>
                  <TextListItemComponent
                    text="Category group"
                    value={selectedGroup?.name || "Select group"}
                    onClick={() => navigateTo(1)}
                  />

                  <SwitchListItemComponent
                    text="Exclude from overview"
                    state={categoryData.excludeFromOverview}
                    onToggle={() =>
                      setCategoryData((prev) => ({
                        ...prev,
                        excludeFromOverview: !prev.excludeFromOverview,
                      }))
                    }
                  />
                </VerticalListContainer>
              </OneColumnTemplate>
            );

          case 1:
            return (
              <OneColumnTemplate
                header={
                  <TwoButtonSubtitlePageHeaderComponent
                    leftButton={
                      <IconButtonComponent
                        icon={<IconRes icon={ICON.BACK} />}
                        onClick={() => navigateTo(0)}
                      />
                    }
                    title="Select category group"
                    rightButton={
                      <IconButtonComponent
                        icon={<IconRes icon={ICON.ADD} />}
                        onClick={() => navigateTo(3)}
                      />
                    }
                  />
                }
              >
                {categorizedGroups.map(({ type, groups }) => (
                  <VerticalListContainer
                    key={type}
                    isElevated={true}
                    header={
                      <SectionHeaderComponent
                        title={type.charAt(0).toUpperCase() + type.slice(1)}
                      />
                    }
                  >
                    {groups.map((group) => (
                      <IconSubTextListItemComponent
                        key={group.id}
                        text={group.name}
                        onClick={() => {
                          setCategoryData((prev) => ({
                            ...prev,
                            category_group_id: group.id,
                          }));
                          navigateTo(0);
                        }}
                        icon={<CategoryIcon color={group.color} />}
                      />
                    ))}
                  </VerticalListContainer>
                ))}
              </OneColumnTemplate>
            );

          case 2:
            return (
              <OneColumnTemplate
                header={
                  <TwoButtonSubtitlePageHeaderComponent
                    leftButton={
                      <IconButtonComponent
                        icon={<IconRes icon={ICON.BACK} />}
                        onClick={() => navigateTo(0)}
                      />
                    }
                    title="Select icon"
                  />
                }
              >
                <GridContainer columnCount={6}>
                  {WALLET_ICONS.map((iconName) => (
                    <div
                      key={iconName}
                      onClick={() => {
                        setCategoryData((prev) => ({
                          ...prev,
                          icon: iconName,
                        }));
                        navigateTo(0);
                      }}
                    >
                      <IconRes icon={iconName} size={32} />
                    </div>
                  ))}
                </GridContainer>
              </OneColumnTemplate>
            );

          case 3:
            return (
              <OneColumnTemplate
                header={
                  <TwoButtonSubtitlePageHeaderComponent
                    leftButton={
                      <IconButtonComponent
                        icon={<IconRes icon={ICON.BACK} />}
                        onClick={() => navigateTo(0)}
                      />
                    }
                    title="Create category group"
                    rightButton={
                      <IconButtonComponent
                        icon={<IconRes icon={ICON.ADD} />}
                        onClick={handleSubmitCategoryGroup}
                        style={{
                          backgroundColor: "var(--color-accent-primary)",
                        }}
                      />
                    }
                  />
                }
              >
                <TypeSelector
                  activeType={newGroupData.type}
                  onTypeChange={(newType) =>
                    setNewGroupData((prev) => ({ ...prev, type: newType }))
                  }
                />

                <EmptyBoxContainer>
                  <HorizontalColorPickerComponent
                    colors={PALETTE_LIST}
                    selectedColorId={newGroupData.color}
                    onSelect={(id) =>
                      setNewGroupData((prev) => ({ ...prev, color: id }))
                    }
                  />
                </EmptyBoxContainer>

                <VerticalListContainer isElevated={true}>
                  <InputListItemComponent
                    text="Name"
                    value={newGroupData.name}
                    placeholder="Name"
                    onChange={(val) =>
                      setNewGroupData((prev) => ({ ...prev, name: val }))
                    }
                  />
                </VerticalListContainer>
              </OneColumnTemplate>
            );

          default:
            return null;
        }
      })()}
    </ViewSwitcher>
  );
}
