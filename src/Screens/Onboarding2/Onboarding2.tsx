import React from "react";
import { i18n, LocalizationKey } from "@/Localization";
import { View, Text, StyleSheet, ImageBackground, Image, Pressable, TouchableOpacity } from "react-native";
import { Button } from "native-base";
import { RootScreens } from "..";
import AppIntroSlider from 'react-native-app-intro-slider';

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
      <TouchableOpacity style={styles.doneButton}>
          <Text style={styles.buttonText}>Bắt đầu</Text>
      </TouchableOpacity>
  );

  const renderNextButton = () => (
      <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
  );

  const renderSkipButton = () => (
    <TouchableOpacity className="bg-white p-[10px]">
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
    <AppIntroSlider
      data={slides}
      renderItem={renderSlide}
      // onDone={() => navigation.replace('Home')} // Navigate to Home screen
      renderDoneButton={renderDoneButton}
      renderNextButton={renderNextButton}
      showSkipButton={true}
      // onSkip={() => navigation.replace('Home')} // Skip to Home screen
      activeDotStyle={styles.activeDot}
      renderSkipButton={renderSkipButton}
    />
  );
};

const styles = StyleSheet.create({
  doneButton: {
      backgroundColor: '#000',
      padding: 10,
      borderRadius: 5,
  },
  nextButton: {
      backgroundColor: '#000',
      padding: 10,
      borderRadius: 5,
  },
  buttonText: {
      color: '#fff',
      fontWeight: 'bold',
  },
  activeDot: {
    backgroundColor: '#737373', // Custom active pagination dot color
    width: 32,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 5,
  },
});
