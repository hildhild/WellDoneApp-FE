import React, { useState } from "react";
import { i18n, LocalizationKey } from "@/Localization";
import { View, Text, StyleSheet, ImageBackground, Image, Pressable, TouchableOpacity, Modal } from "react-native";
import { Button } from "native-base";
import { RootScreens } from "..";
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from "@react-native-async-storage/async-storage";

type Slide = {
  key: string;
  title: string;
  text: string;
  image: any; 
};

const slides: Slide[] = [
  {
      key: '1',
      title: 'Quản lý dự án thông minh',
      text: 'Dễ dàng tạo và phân công nhiệm vụ, đặt thời hạn và gán nhãn.',
      image: require('assets/onboarding1.png'),
  },
  {
      key: '2',
      title: 'Làm việc nhóm hiệu quả',
      text: 'Kết nối với nhóm của bạn qua trò chuyện và bình luận, cùng với khả năng chia sẻ tệp để làm việc hiệu quả hơn.',
      image: require('assets/onboarding2.png'),
  },
  {
      key: '3',
      title: 'Kiểm soát tiến độ trong tầm tay',
      text: 'Theo dõi tiến độ mọi lúc, mọi nơi, đảm bảo hoàn thành đúng hạn. ',
      image: require('assets/onboarding3.png'),
  },
];

export const Onboarding2 = (props: {
  onNavigate: (string: RootScreens) => void;
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const handleFinish = async () => {
    await AsyncStorage.setItem("onboardingCompleted", "true");
    props.onNavigate(RootScreens.ONBOARDING3);
  };

  const renderSlide = ({ item }: { item: Slide }) => (
    <View className="flex items-center justify-center w-[100vw] h-[100vh] bg-white">
        <Image
          className="w-[400px] h-[250px] object-cover"
          source={item.image}
        />
        <Text className='text-4xl font-bold px-10 text-center text-neutral-900 mb-5'>{item.title}</Text>
        <Text className='text-lg text-neutral-600 px-[30px] text-center'>{item.text}</Text>
    </View>
  );

  const renderDoneButton = () => (
    <TouchableOpacity className="rounded-full bg-lime-600 w-[40px] h-[40px] flex items-center justify-center" onPress={handleFinish}>
      <Icon name="chevron-right" size={10} color="#fff" />
    </TouchableOpacity>
  );

  const renderNextButton = () => (
    <View className="rounded-full bg-lime-600 w-[40px] h-[40px] flex items-center justify-center">
        <Icon name="chevron-right" size={10} color="#fff" />
    </View>
  );

  const renderSkipButton = () => (
    <TouchableOpacity className="bg-white px-[10px] py-[15px]" onPress={() => setModalVisible(true)}>
      <Text className="text-lime-600 font-bold">Bỏ qua</Text>
    </TouchableOpacity>
  );

  return (
    // <View className="flex items-center justify-center w-[100vw] h-[100vh] bg-white">
    //   <Image
    //     className="w-[400px] h-[250px] object-cover"
    //     source={require('assets/onboarding2.png')}
    //   />
        
    //   <Text className='text-4xl font-bold px-20 text-center text-neutral-900 mb-5'>Quản lý dự án thông minh</Text>
    //   <Text className='text-lg text-neutral-600 px-[30px] text-center'>Dễ dàng tạo và phân công nhiệm vụ, đặt thời hạn và gán nhãn. </Text>
    //   <Button onPress={() => props.onNavigate(RootScreens.MAIN)}>
    //     {i18n.t(LocalizationKey.START)}
    //   </Button>
    // </View>
    <>
      <AppIntroSlider
        data={slides}
        renderItem={renderSlide}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        showSkipButton={true}
        activeDotStyle={styles.activeDot}
        renderSkipButton={renderSkipButton}
      />
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          // onRequestClose={() => {
          //   Alert.alert('Modal has been closed.');
          //   setModalVisible(!modalVisible);
          // }}
          >
          <View className="flex justify-center items-center w-full h-full">
            <View className="bg-neutral-300 rounded-3xl px-[40px] py-[30px]">
              <Text className="text-xl font-bold text-center mb-4">Bạn có muốn bỏ qua không?</Text>
              <View className="flex flex-row justify-between">
                <Pressable className="w-[80px] !rounded-full !bg-[#DC2626] flex justify-center items-center px-3 py-5" onPress={() => setModalVisible(false)}>
                  <Text className="text-white font-semibold text-center">Không</Text>
                </Pressable>
                <Pressable className="w-[80px] !rounded-full !bg-lime-600" onPress={() => { setModalVisible(false); handleFinish(); }}>
                  <Text className="text-white font-semibold text-center">Có</Text>
                </Pressable>
              </View>
            </View>
          </View>
      </Modal>
    </>
    
  );
};

const styles = StyleSheet.create({
  activeDot: {
    backgroundColor: '#737373', // Custom active pagination dot color
    width: 32,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 5,
  },
});
