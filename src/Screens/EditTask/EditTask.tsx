import { LoadingProcess } from "@/Components";
import { generateDateTime } from "@/Utils/Funtions/generate";
import DateTimePicker from "@react-native-community/datetimepicker";
import { ScrollView } from "native-base";
import React from "react";
import { Control, Controller } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import { RootScreens } from "..";
import { Priority, TaskStatus } from "@/Utils/constant";

const MyIcon = Icon as unknown as React.ComponentType<any>;

export interface EditTaskProps {
  control: Control<any>;
  onSubmit: () => void;
  userList: Array<{ label: string; value: number }>;
  projectList: Array<{ label: string; value: number }>;
  selectedUsers: Array<{ id: number; name: string }>;
  onUserSelection: (user: { label: string; value: number }) => void;
  onUserRemove: (userId: number) => void;
  isLoading: boolean;
  onNavigate: (screen: RootScreens) => void;
  onBack: () => void;
}

export const EditTask: React.FC<EditTaskProps> = ({
  control,
  onSubmit,
  userList,
  projectList,
  selectedUsers,
  onUserSelection,
  onUserRemove,
  isLoading,
  onBack,
}) => {
  const [showDueDatePicker, setShowDueDatePicker] = React.useState(false);
  const [dueDate, setDueDate] = React.useState(new Date());
  return (
    <KeyboardAvoidingView
      className="bg-[#F8FBF6] w-full h-full relative"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <LoadingProcess isVisible={isLoading} />
      <View className="w-full h-24 pb-4 flex justify-end items-center">
        <Text className="text-2xl font-bold px-10 text-center text-black">
          Chỉnh sửa nhiệm vụ
        </Text>
      </View>

      <Pressable
        className="absolute left-5 top-10 w-12 h-12 flex justify-center items-center rounded-full border-[1px] border-neutral-400"
        onPress={onBack}
      >
        <MyIcon name="chevron-left" size={15} color="#000" />
      </Pressable>

      <Pressable
        className="absolute right-5 top-10 w-12 h-12 flex justify-center items-center rounded-full border-[1px] border-neutral-400"
        onPress={onSubmit}
      >
        <MyIcon name="save" size={20} color="#000" />
      </Pressable>

      <ScrollView className="w-full p-6">
        <View className="mb-3">
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <>
                <Text className="mb-2 font-semibold text-[#3F6212] text-lg">
                  Tên nhiệm vụ
                </Text>
                <TextInput
                  placeholder="Nhập tên nhiệm vụ"
                  className="text-neutral-700 text-body-base-regular rounded-xl p-4 mb-2 border-[1px] border-gray-300 bg-white"
                  value={value}
                  onChangeText={onChange}
                />
              </>
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <>
                <Text className="mb-2 font-semibold text-[#3F6212] text-lg">
                  Mô tả nhiệm vụ
                </Text>
                <TextInput
                  placeholder="Nhập mô tả nhiệm vụ"
                  multiline
                  className="text-neutral-700 text-body-base-regular rounded-xl p-4 mb-2 border-[1px] border-gray-300 bg-white"
                  value={value}
                  onChangeText={onChange}
                />
              </>
            )}
          />

          <Controller
            control={control}
            name="projectId"
            render={({ field: { onChange, value } }) => (
              <>
                <Text className="mb-2 font-semibold text-[#3F6212] text-lg">
                  Dự án
                </Text>
                <Dropdown
                  style={styles.dropdown}
                  data={projectList}
                  value={value}
                  labelField="label"
                  valueField="value"
                  onChange={(item) => onChange(item.value)}
                  renderLeftIcon={() => (
                    <MyIcon name="folder" size={20} color="#84cc16" />
                  )}
                  {...dropdownProps}
                />
              </>
            )}
          />

          <Text className="mb-2 font-semibold text-[#3F6212] text-lg mt-2">
            Thành viên
          </Text>
          <Dropdown
            style={styles.dropdown}
            data={userList}
            labelField="label"
            valueField="value"
            onChange={onUserSelection}
            renderLeftIcon={() => (
              <MyIcon name="users" size={20} color="#84cc16" />
            )}
            {...dropdownProps}
          />

          {selectedUsers.map((user) => (
            <View
              key={user.id}
              className="flex-row items-center justify-between rounded-xl px-4 py-3 mb-2 border-[1px] border-gray-300 bg-white mt-3"
            >
              <Text className="font-semibold">{user.name}</Text>
              <Pressable onPress={() => onUserRemove(user.id)}>
                <MyIcon name="trash" size={20} />
              </Pressable>
            </View>
          ))}

          <Controller
            control={control}
            name="status"
            render={({ field: { onChange, value } }) => (
              <>
                <Text className="mb-2 font-semibold text-[#3F6212] text-lg mt-2">
                  Trạng thái
                </Text>
                <Dropdown
                  labelField={""}
                  valueField={""}
                  style={styles.dropdown}
                  data={[
                    { label: "Mới", value: "TODO" },
                    { label: "Đang làm", value: "IN_PROGRESS" },
                    { label: "Xong", value: "DONE" },
                  ]}
                  value={value}
                  onChange={(item) => onChange(item.value)}
                  renderLeftIcon={() => (
                    <MyIcon color="#84cc16" name="line-chart" size={20} />
                  )}
                  {...dropdownProps}
                />
              </>
            )}
          />

          <Controller
            control={control}
            name="priority"
            render={({ field: { onChange, value } }) => (
              <>
                <Text className="mb-2 font-semibold text-[#3F6212] text-lg mt-2">
                  Độ ưu tiên
                </Text>
                <Dropdown
                  labelField={""}
                  valueField={""}
                  style={styles.dropdown}
                  data={[
                    { label: "Cao", value: "HIGH" },
                    { label: "Trung bình", value: "MEDIUM" },
                    { label: "Thấp", value: "LOW" },
                  ]}
                  value={value}
                  onChange={(item) => onChange(item.value)}
                  renderLeftIcon={() => (
                    <MyIcon color="#84cc16" name="sort-amount-desc" size={20} />
                  )}
                  {...dropdownProps}
                />
              </>
            )}
          />

          <Controller
            control={control}
            name="dueDate"
            render={({ field: { onChange, value } }) => (
              <>
                <Text className="mb-2 font-semibold text-[#3F6212] text-lg mt-2">
                  Hạn
                </Text>
                <TouchableOpacity
                  onPress={() => setShowDueDatePicker(true)}
                  className="mb-16 text-neutral-700 text-body-base-regular rounded-xl px-4 py-2 border-[1px] border-gray-300 bg-white flex-row justify-between items-center"
                >
                  <Text className="text-body-base-regular text-neutral-900 flex-1">
                    {generateDateTime(value)}
                  </Text>
                  {showDueDatePicker && (
                    <DateTimePicker
                      value={dueDate}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        if (event.type === "set" && selectedDate) {
                          setDueDate(selectedDate);
                          onChange(selectedDate.toISOString());
                          setShowDueDatePicker(false);
                        } else if (event.type === "dismissed") {
                          setShowDueDatePicker(false);
                        }
                      }}
                    />
                  )}
                  <MyIcon name="calendar" size={20} />
                </TouchableOpacity>
              </>
            )}
          />
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
  icon: {
    marginRight: 5,
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

const dropdownProps = {
  placeholderStyle: styles.placeholderStyle,
  selectedTextStyle: styles.selectedTextStyle,
  inputSearchStyle: styles.inputSearchStyle,
  iconStyle: styles.iconStyle,
  search: true,
  maxHeight: 300,
  placeholder: "Chọn...",
  searchPlaceholder: "Tìm kiếm...",
};

export interface FormData {
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: TaskStatus  ;
  assigneeIds: number[];
  projectId: number;
}

export interface User {
  id: number;
  name: string;
}

export interface DropdownItem {
  label: string;
  value: number | string;
}
