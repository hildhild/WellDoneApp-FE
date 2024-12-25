import { LoadingProcess } from "@/Components";
import { setProjectId } from "@/Store/reducers";
import { generateDateTime } from "@/Utils/Funtions/generate";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";

const MyIcon = Icon as unknown as React.ComponentType<any>;

export interface AddTaskForm {
  title: string;
  description: string;
  dueDate: Date;
  priority: "HIGH" | "MEDIUM" | "LOW";
  status: "TODO" | "IN_PROGRESS" | "DONE";
  assigneeIds: number[];
  projectId: number;
}

interface IAddTaskProps {
  projectList: any[];
  userList: any[];
  selectedUsers: { name: string; id: number }[];
  setSelectedUsers: (users: { name: string; id: number }[]) => void;
  onCreateTask: (data: AddTaskForm) => void;
  isLoading: boolean;
  groupProjectId: number | null;
  handleProjectChange: (projectId: number) => void;
  projectId: number | null;
}

const AddTask: FC<IAddTaskProps> = ({
  projectList,
  userList,
  selectedUsers,
  setSelectedUsers,
  onCreateTask,
  isLoading,
  groupProjectId,
  handleProjectChange,
  projectId,
}) => {
  const navigation = useNavigation();
  const [showDueDatePicker, setShowDueDatePicker] = React.useState(false);
  const [dueDate, setDueDate] = React.useState(new Date());
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddTaskForm>({
    defaultValues: {
      title: "",
      description: "",
      dueDate: new Date(),
      priority: "HIGH",
      status: "TODO",
      assigneeIds: [],
      projectId: projectId ? projectId : groupProjectId ? groupProjectId : undefined,
    },
  });

  return (
    <KeyboardAvoidingView
      className="bg-[#F8FBF6] w-full h-full relative"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <LoadingProcess isVisible={isLoading} />
      <View className="w-full h-24 pb-4 flex justify-end items-center">
        <Text className="text-2xl font-bold px-10 text-center text-black">
          Thêm nhiệm vụ
        </Text>
      </View>
      <TouchableOpacity
        className="absolute left-5 top-10 w-12 h-12 flex justify-center items-center rounded-full border-[1px] border-neutral-400"
        onPress={() => { navigation.goBack();}}
      >
        <MyIcon name="chevron-left" size={15} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity
        className="absolute right-5 top-10 w-12 h-12 flex justify-center items-center rounded-full border-[1px] border-neutral-400"
        onPress={handleSubmit(onCreateTask)}
      >
        <MyIcon name="save" size={20} color="#000" />
      </TouchableOpacity>

      <ScrollView className="w-full p-6">
        <View className="mb-3">
          <Text className="mb-2 font-semibold text-[#3F6212] text-lg">
            Tên nhiệm vụ <Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            name="title"
            rules={{ required: "Tên nhiệm vụ là bắt buộc" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Nhập tên nhiệm vụ"
                className="text-neutral-700 text-body-base-regular rounded-xl p-4 mb-2 border-[1px] border-gray-300 bg-white"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.title && (
            <Text className="text-red-500 mb-2">{errors.title.message}</Text>
          )}

          <Text className="mb-2 font-semibold text-[#3F6212] text-lg">
            Mô tả nhiệm vụ <Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            name="description"
            rules={{ required: "Mô tả nhiệm vụ là bắt buộc" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Nhập mô tả nhiệm vụ"
                multiline
                className="text-neutral-700 text-body-base-regular rounded-xl p-4 mb-2 border-[1px] border-gray-300 bg-white"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.description && (
            <Text className="text-red-500 mb-2">
              {errors.description.message}
            </Text>
          )}

          <Text className="mb-2 font-semibold text-[#3F6212] text-lg">
            Dự án <Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            name="projectId"
            rules={{ required: "Dự án là bắt buộc" }}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={projectList}
                value={value}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Chọn dự án"
                searchPlaceholder="Tìm kiếm..."
                onChange={(item) => {
                  onChange(parseInt(item.value));
                  handleProjectChange(parseInt(item.value));
                }}
                renderLeftIcon={() => (
                  <MyIcon name="folder" size={20} color="#84cc16" />
                )}
              />
            )}
          />
          {errors.projectId && (
            <Text className="text-red-500 mb-2">
              {errors.projectId.message}
            </Text>
          )}

          <Text className="mb-2 font-semibold text-[#3F6212] text-lg mt-2">
            Thành viên <Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            name="assigneeIds"
            rules={{ required: "Cần chọn ít nhất một thành viên" }}
            render={({ field: { onChange, value } }) => (
              <>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={userList}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Chọn thành viên"
                  searchPlaceholder="Tìm kiếm..."
                  onChange={(item) => {
                    if (!selectedUsers.some((user) => user.id === item.value)) {
                      setSelectedUsers([
                        ...selectedUsers,
                        { name: item.label, id: item.value },
                      ]);
                      onChange([...value, item.value]);
                    }
                  }}
                  renderLeftIcon={() => (
                    <MyIcon name="users" size={20} color="#84cc16" />
                  )}
                />
                {selectedUsers.map((user) => (
                  <View
                    key={user.id}
                    className="flex-row items-center justify-between rounded-xl px-4 py-3 mb-2 border-[1px] border-gray-300 bg-white mt-3"
                  >
                    <Text className="font-semibold">{user.name}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedUsers(
                          selectedUsers.filter((u) => u.id !== user.id)
                        );
                        onChange(value.filter((id: number) => id !== user.id));
                      }}
                    >
                      <MyIcon name="trash" size={20} />
                    </TouchableOpacity>
                  </View>
                ))}
              </>
            )}
          />
          {errors.assigneeIds && (
            <Text className="text-red-500 mb-2">
              {errors.assigneeIds.message}
            </Text>
          )}

          <Text className="mb-2 font-semibold text-[#3F6212] text-lg mt-2">
            Trạng thái <Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            name="status"
            rules={{ required: "Trạng thái là bắt buộc" }}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={[
                  { label: "Mới", value: "TODO" },
                  { label: "Đang làm", value: "IN_PROGRESS" },
                  { label: "Xong", value: "DONE" },
                ]}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Chọn trạng thái"
                value={value}
                onChange={(item) => onChange(item.value)}
                renderLeftIcon={() => (
                  <MyIcon color="#84cc16" name="line-chart" size={20} />
                )}
              />
            )}
          />
          {errors.status && (
            <Text className="text-red-500 mb-2">{errors.status.message}</Text>
          )}

          <Text className="mb-2 font-semibold text-[#3F6212] text-lg mt-2">
            Độ ưu tiên <Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            name="priority"
            rules={{ required: "Độ ưu tiên là bắt buộc" }}
            render={({ field: { onChange, value } }) => (
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={[
                  { label: "Cao", value: "HIGH" },
                  { label: "Trung bình", value: "MEDIUM" },
                  { label: "Thấp", value: "LOW" },
                ]}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Chọn độ ưu tiên"
                value={value}
                onChange={(item) => onChange(item.value)}
                renderLeftIcon={() => (
                  <MyIcon color="#84cc16" name="sort-amount-desc" size={20} />
                )}
              />
            )}
          />
          {errors.priority && (
            <Text className="text-red-500 mb-2">{errors.priority.message}</Text>
          )}

          <Text className="mb-2 font-semibold text-[#3F6212] text-lg mt-2">
            Hạn <Text className="text-red-500">*</Text>
          </Text>
          <Controller
            control={control}
            name="dueDate"
            rules={{ required: "Hạn là bắt buộc" }}
            render={({ field: { onChange, value } }) => (
              <TouchableOpacity
                onPress={() => setShowDueDatePicker(true)}
                className="mb-16 text-neutral-700 text-body-base-regular rounded-xl px-4 py-2 border-[1px] border-gray-300 bg-white flex-row justify-between items-center"
              >
                <Text className="text-body-base-regular text-neutral-900 flex-1">
                  {generateDateTime(value.toISOString())}
                </Text>
                {showDueDatePicker && (
                  <DateTimePicker
                    value={dueDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                      if (event.type === "set" && selectedDate) {
                        setDueDate(selectedDate);
                        onChange(selectedDate);
                        setShowDueDatePicker(false);
                      } else if (event.type === "dismissed") {
                        setShowDueDatePicker(false);
                      }
                    }}
                  />
                )}

                <MyIcon name="calendar" size={20} />
              </TouchableOpacity>
            )}
          />
          {errors.dueDate && (
            <Text className="text-red-500 mb-2">{errors.dueDate.message}</Text>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    padding: 15,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    marginLeft: 10,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default AddTask;
