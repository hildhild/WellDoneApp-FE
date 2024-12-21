import { RootScreens } from "@/Screens";
import { StatusType } from "@/Utils/constant";
import { generateStatusText } from "@/Utils/Funtions/generate";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import ArrowDown from "assets/icons/ProjectEdit/arrowDown";
import ArrowUp from "assets/icons/ProjectEdit/arrowUp";
import GroupsIcon from "assets/icons/ProjectEdit/groupsIcon";
import StatusIcon from "assets/icons/ProjectEdit/statusIcon";
import React, { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ProjectCreateForm } from "./ProjectCreateContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/Store";
import ViewGroups from "../ProjectEdit/ViewGroups";
import { Status } from "@/Utils/constant";

interface IProjectCreateProps {
  onNavigate: (screen: RootScreens) => void;
  onCreateProject: (data: ProjectCreateForm) => void;
}

const ProjectCreate: FC<IProjectCreateProps> = ({
  onNavigate,
  onCreateProject,
}) => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectCreateForm>();
  const [open, setOpen] = useState(false);
  const [statusValue, setStatusValue] = useState<Status>(StatusType.NEW as Status);
  const [timeHours, setTimeHours] = useState<number>(0);
  const [items, setItems] = useState([
    { label: generateStatusText(StatusType.NEW), value: StatusType.NEW },
    {
      label: generateStatusText(StatusType.IN_PROGRESS),
      value: StatusType.IN_PROGRESS,
    },
    {
      label: generateStatusText(StatusType.COMPLETED),
      value: StatusType.COMPLETED,
    },
  ]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const group = useSelector((state: RootState) => state.group.groupList);
  const convertIDToName = (id: string[]) => {
    return group
      .filter((item) => id.includes(item.id.toString()))
      .map((item) => item.name);
  };
  const [openViewGroups, setOpenViewGroups] = useState(false);
  const [groupDisplay, setGroupDisplay] = useState<string[]>([]);
  const onSubmit = (data: ProjectCreateForm) => {
    const transformedData: ProjectCreateForm = {
      project_name: data.project_name,
      project_description: data.project_description,
      project_group_member: data.project_group_member,
      project_status: statusValue,
      project_sum_hours: timeHours,
      project_start_date: data.project_start_date,
      project_end_date: data.project_end_date,
    };
    onCreateProject(transformedData);
  };
  const handleChange = (text: string) => {
    if (!text) {
      setTimeHours(0);
      return;
    } else {
      if (parseInt(text) < 0) {
        setTimeHours(0);
      } else {
        setTimeHours(parseInt(text));
      }
    }
  };

  const renderItem = () => (
    <View className="px-4 pt-8">
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left-circle-outline"
            size={32}
            color="black"
          />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-center">Thêm Dự án</Text>
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Feather name="save" size={32} color="black" />
        </TouchableOpacity>
      </View>

      <View className="items-center mb-4">
        <Image
          source={require("assets/dark-logo.png")}
          className="rounded-full w-32 h-32"
        />
        <TouchableOpacity onPress={() => {}}>
          <Text className="text-sm text-gray-600">Thay đổi ảnh</Text>
        </TouchableOpacity>
      </View>

      <View>
        <View className="flex-col p-4 rounded-2xl items-left mb-2 shadow-lg bg-neutral-100">
          <Text className="text-caption-regular text-neutral-500">
            Tên dự án
          </Text>
          <Controller
            control={control}
            name="project_name"
            rules={{ required: "Tên dự án là bắt buộc" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="text-body-base-regular text-neutral-900 w-full"
                placeholder="Tên dự án"
                value={value}
                onChangeText={onChange}
                defaultValue={""}
              />
            )}
          />
          {errors.project_name && (
            <Text className="text-danger-600 text-caption-bold mb-2">
              {typeof errors.project_name.message === "string" &&
                errors.project_name.message}
            </Text>
          )}
        </View>

        <View className="flex-col p-4 rounded-2xl items-left mb-2 shadow-lg bg-neutral-100">
          <Text className="text-caption-regular text-neutral-500">Mô tả</Text>
          <Controller
            control={control}
            name="project_description"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="text-body-base-regular text-neutral-900 w-full "
                placeholder="Mô tả dự án"
                value={value}
                onChangeText={onChange}
                multiline
                numberOfLines={3}
                defaultValue={""}
                maxLength={300}
              />
            )}
          />
        </View>
        {errors.project_description && (
          <Text className="text-danger-600 text-caption-bold mb-2">
            {typeof errors.project_description.message === "string" &&
              errors.project_description.message}
          </Text>
        )}
        <View className="flex-row p-4 rounded-2xl mb-2 shadow-lg bg-neutral-100">
          <View className="mr-4 justify-center items-center">
            <GroupsIcon />
          </View>
          <View className="flex-col flex-1">
            <View className="flex-row items-center mb-2">
              <Text className="text-caption-regular text-neutral-500">
                Nhóm
              </Text>
              <Text className="text-danger-600"> *</Text>
            </View>
            <Controller
              control={control}
              name="project_group_member"
              render={({ field: { onChange } }) => (
                <View className="flex-row flex-wrap mb-4">
                  {convertIDToName(groupDisplay).slice(0, 3).map((member, index) => (
                    <View
                      key={index}
                      className="bg-gray-200 rounded-full px-2 py-1 mr-2 mb-2 flex-row items-center"
                    >
                      <Text className="text-caption-bold mr-1">
                        {String(member)}
                      </Text>
                      <AntDesign name="checkcircle" size={12} color="green" />
                    </View>
                  ))}
                  {openViewGroups && (
                    <ViewGroups
                      listGroupId={group.map((item) => item.id)}
                      closeModal={() => setOpenViewGroups(false)}
                      handleSave={(listGroupName) => {
                        setOpenViewGroups(false);
                        onChange(listGroupName);
                        setGroupDisplay(listGroupName);
                      }}
                    />
                  )}
                </View>
              )}
            />
          </View>
          <TouchableOpacity
            className="mt-4 p-2 rounded-md"
            onPress={() => setOpenViewGroups(true)}
          >
            <AntDesign name="edit" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {/* {errors.project_group_member && (
          <Text className="text-danger-600 text-caption-bold mb-2">
            {errors.project_group_member.message}
          </Text>
        )} */}
        <View className="flex-row p-4 rounded-2xl items-left mb-2 shadow-lg bg-neutral-100">
          <View className="mr-2 justify-center">
            <StatusIcon />
          </View>
          <View className="flex-col">
            <View className="flex-row items-center">
              <Text className="text-caption-regular text-neutral-500">
                Trạng thái
              </Text>
              <Text className="text-danger-600"> *</Text>
            </View>
            <View style={{ zIndex: 2000 }}>
              <Controller
                control={control}
                name="project_status"
                render={({ field: { onChange, value } }) => (
                  <DropDownPicker
                    open={open}
                    value={statusValue ?? null}
                    items={items}
                    setOpen={setOpen}
                    setItems={setItems}
                    setValue={(val) => {
                      setStatusValue(val);
                      onChange(val);
                    }}
                    placeholder="Chọn trạng thái"
                    multiple={false}
                    style={{
                      borderWidth: 0,
                      height: 40,
                      width: 300,
                    }}
                    containerStyle={{ height: open ? 180 : 40 }}
                    dropDownContainerStyle={{
                      borderWidth: 0,
                    }}
                    ArrowDownIconComponent={({ style }) => (
                      <ArrowDown style={style} />
                    )}
                    ArrowUpIconComponent={({ style }) => (
                      <ArrowUp style={style} />
                    )}
                  />
                )}
              />
            </View>
          </View>
        </View>
        {errors.project_status && (
          <Text className="text-danger-600 text-caption-bold mb-2">
            {typeof errors.project_status.message === "string" &&
              errors.project_status.message}
          </Text>
        )}
        <View className="flex-col p-4 rounded-2xl items-left mb-2 shadow-lg bg-neutral-100">
          <View className="flex-row items-center mb-2">
            <Text className="text-caption-regular text-neutral-500">
              Thời gian (Giờ)
            </Text>
            <Text className="text-danger-600"> *</Text>
          </View>
          <Controller
            control={control}
            name="project_sum_hours"
            render={({ field: { onChange, value } }) => (
              <TextInput
                keyboardType="numeric"
                value={timeHours.toString()}
                onChange={(e) => {
                  const text = e.nativeEvent.text;
                  setTimeHours(parseInt(text));
                  onChange(text);
                  handleChange(text);
                }}
                placeholder="Nhập số giờ"
                defaultValue={"0"}
              />
            )}
          />
        </View>
        {errors.project_sum_hours && (
          <Text className="text-danger-600 text-caption-bold mb-2">
            {typeof errors.project_sum_hours.message === "string" &&
              errors.project_sum_hours.message}
          </Text>
        )}
        <View className="flex-col p-4 rounded-2xl items-left mb-2 shadow-lg bg-neutral-100">
          <View className="flex-row items-center mb-2">
            <Text className="text-caption-regular text-neutral-500">
              Ngày bắt đầu
            </Text>
            <Text className="text-danger-600"> *</Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            className="flex-row items-center justify-between"
          >
            <Controller
              control={control}
              name="project_start_date"
              render={({ field: { onChange } }) => (
                <>
                  <Text className="text-body-base-regular text-neutral-900 flex-1">
                    {startDate
                      ? startDate.toLocaleDateString()
                      : "Chọn ngày kết thúc"}
                  </Text>
                  {showStartDatePicker && (
                    <DateTimePicker
                      value={startDate}
                      mode="date"
                      display="spinner"
                      onChange={(event, selectedDate) => {
                        if (selectedDate) {
                          setStartDate(selectedDate);
                          onChange(selectedDate);
                        }
                        setShowStartDatePicker(false);
                      }}
                      themeVariant="light"
                    />
                  )}
                </>
              )}
            />
            <AntDesign
              name="edit"
              size={24}
              color="black"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>
        {errors.project_start_date && (
          <Text className="text-danger-600 text-caption-bold mb-2">
            {typeof errors.project_start_date.message === "string" &&
              errors.project_start_date.message}
          </Text>
        )}
        <View className="flex-col p-4 rounded-2xl items-left mb-2 shadow-lg bg-neutral-100">
          <View className="flex-row items-center mb-2">
            <Text className="text-caption-regular text-neutral-500">
              Ngày kết thúc
            </Text>
            <Text className="text-danger-600"> *</Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)}
            className="flex-row items-center justify-between"
          >
            <Controller
              control={control}
              name="project_end_date"
              render={({ field: { onChange } }) => (
                <>
                  <Text className="text-body-base-regular text-neutral-900 flex-1">
                    {endDate
                      ? endDate.toLocaleDateString()
                      : "Chọn ngày kết thúc"}
                  </Text>
                  {showEndDatePicker && (
                    <DateTimePicker
                      value={endDate}
                      mode="date"
                      display="spinner"
                      onChange={(event, selectedDate) => {
                        if (selectedDate) {
                          setEndDate(selectedDate);
                          onChange(selectedDate);
                        }
                        setShowEndDatePicker(false);
                      }}
                      themeVariant="light"
                    />
                  )}
                </>
              )}
            />
            <AntDesign
              name="edit"
              size={24}
              color="black"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      {errors.project_end_date && (
        <Text className="text-danger-600 text-caption-bold mb-2">
          {typeof errors.project_end_date.message === "string" &&
            errors.project_end_date.message}
        </Text>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#F6FCF3" }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <FlatList
        data={[1]}
        renderItem={renderItem}
        keyExtractor={() => "project-create"}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
        contentContainerStyle={{ flexGrow: 1 }}
        removeClippedSubviews={false}
        scrollEventThrottle={16}
        overScrollMode="never"
      />
    </KeyboardAvoidingView>
  );
};

export default ProjectCreate;
