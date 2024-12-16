import AvatarStack from "@/Components/AvatarStack";
import { IProjectDetail } from "@/Services/projects";
import {
  renderDocumentTypeIcon,
  renderPriorityIcon,
  renderStatusLabel,
} from "@/Utils/Funtions/render";
import { useNavigation } from "@react-navigation/native";
import React, { FC, memo } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import Foundation from "react-native-vector-icons/Foundation";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
interface IProjectDetailProps {
  project: IProjectDetail;
}

const ProjectDetail: FC<IProjectDetailProps> = (props: IProjectDetailProps) => {
  const navigation = useNavigation();
  return (
    <View className="bg-white h-full mt-8">
      <View className="flex-row justify-between items-center p-4 bg-neutral-100">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="arrow-left-circle-outline"
            size={32}
            color="black"
          />
        </TouchableOpacity>
        <Text className="text-heading4 font-bold">Chi tiết Dự án</Text>
        <MaterialCommunityIcons name="pencil-outline" size={24} color="black" />
      </View>

      <ScrollView className="p-4">
        <View className="flex-row justify-between items-center mb-2">
          <View className="flex-col">
            <Text className="text-body-small-regular text-neutral-500">
              Tên dự án
            </Text>
            <Text className="text-heading4 font-bold text-center mt-2">
              {props.project.name}
            </Text>
          </View>

          {renderStatusLabel(props.project.status)}
        </View>
        <View className="flex-row justify-end">
          <TouchableOpacity className="flex-row items-center bg-primary-500 p-2 w-28 text-neutral-100 text-body-small-regular rounded-lg mt-4">
            <Foundation name="graph-bar" size={24} color="black" />
            <Text> Thống kê</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-body-small-regular text-neutral-500  mt-4">
          Thành viên
        </Text>
        <AvatarStack users={props.project.members} display="row" />

        <Text className="text-body-small-regular text-neutral-500 mt-4">
          Mô tả dự án
        </Text>
        <Text className="text-body-large-regular text-neutral-900">
          {props.project.description}
        </Text>

        <Text className="text-body-small-regular text-neutral-500  mt-4">
          Tài liệu
        </Text>
        <ScrollView horizontal className="flex-row">
          <View className="flex-row mt-2 space-x-4">
            {props.project.documents.map(
              (doc: { id: number; type: string }) => (
                <TouchableOpacity key={doc.id}>
                  <View className="items-center w-20 h-20">
                    {renderDocumentTypeIcon(doc.type)}
                  </View>
                </TouchableOpacity>
              )
            )}
          </View>
        </ScrollView>
        <View className="mt-6">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-body-small-regular text-neutral-500">
              Tasks
            </Text>
            <TouchableOpacity>
              <Text className="text-body-small-regular text-neutral-500">
                Thêm nhiệm vụ
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="p-4">
            {props.project.tasks.map((task) => (
              <View
                key={task.id}
                className="flex-row items-center bg-neutral-100 p-3 rounded-lg mb-2"
              >
                <View
                  className={`w-6 h-6 rounded-full items-center justify-center mr-4`}
                >
                  {task.status === "completed" && (
                    <AntDesign name="checkcircle" size={20} color="green" />
                  )}
                  {(task.status === "in_progress" || task.status === "new") && (
                    <AntDesign name="checkcircleo" size={20} color="black" />
                  )}
                </View>

                <View className="flex-1">
                  <View className="flex-col">
                    <Text className="font-medium text-neutral-900">
                      {task.name}
                    </Text>
                    <Text className="text-sm text-neutral-500">
                      #{task.task_code}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <IonIcons name="flag-outline" size={20} color="black" />
                    <Text className="text-sm text-neutral-500">
                      {task.sum_hours} hr
                    </Text>
                  </View>
                </View>
                <AvatarStack
                  users={task.members}
                  maxVisible={2}
                  display="row"
                />
                {renderPriorityIcon(task.priority)}
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
export default memo(ProjectDetail);
