import moment from "moment";
import React, { useEffect, useRef } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { WheelPicker } from "./components/wheelPicker";

type Props = {
  onDateChange: (date: Date) => void;
  defaultDate: string;
};

const TimePicker: React.FC<Props> = ({ onDateChange, defaultDate }) => {
  const yearList = Array.from(
    { length: moment().year() + 70 - moment().year() - 9 },
    (_, i) => moment().year() - 10 + i
  );
  const monthList = moment.months();
  //console.log('defaultDate::', defaultDate);

  const monthIndex = monthList.indexOf(
    moment(defaultDate).utc().format("MMMM")
  );

  const yearIndex = yearList.indexOf(moment(defaultDate).year());
  //console.log('monthIndex::', monthIndex, yearIndex);

  const [month, setMonth] = React.useState({
    index: monthIndex,
  });
  console.log("yearIndex::", moment(defaultDate).year(), yearIndex);
  const [year, setYear] = React.useState({
    index: yearIndex,
    // value: yearList[currentYearIndex],
  });

  const pickerRef1 = useRef<FlatList<any>>(null);
  const pickerRef2 = useRef<FlatList<any>>(null);

  useEffect(() => {
    // console.log('*****year', yearList[year.index]);
    // console.log('*****month', monthList[month.index]);
    const monthNumber = moment().month(monthList[month.index]).format("M");

    const result = new Date(Date.UTC(2025, 13 - 1, 1));

    console.log("tt", result);

    const selectedDate = new Date(
      Date.UTC(yearList[year.index], Number(monthNumber), 1)
    );
    const currentDate = new Date();
    const isPreviousDateSelected = selectedDate < currentDate;
    if (isPreviousDateSelected) {
      scrollPicker();
      //  console.log('*****1', yearList[year.index]);
      onDateChange(currentDate);
    } else {
      // console.log('*****2', yearList[year.index]);
      onDateChange(selectedDate);
    }

    // const selectedDate = new Date(
    //   year.value,
    //   monthList.indexOf(month.value) + 1,
    //   1,
    // );
    // const currentDate = new Date();
    // const isPreviousDateSelected = selectedDate < currentDate;
    // if (isPreviousDateSelected) {
    //   scrollPicker();
    //   onDateChange(currentDate);
    // } else {
    //   onDateChange(selectedDate);
    // }
  }, [month, year]);

  const scrollPicker = () => {
    //  console.log('tttt:', monthIndex);

    pickerRef1.current?.scrollToIndex({ index: monthIndex, animated: true });
    pickerRef2.current?.scrollToIndex({ index: yearIndex, animated: true });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      horizontal={true}
      scrollEnabled={false}
    >
      <View style={styles.container}>
        <View style={styles.wheelPickerContainer}>
          <WheelPicker
            restElements={2}
            data={monthList}
            initialSelectedIndex={monthIndex}
            selectedIndex={month?.index ?? 0}
            onChangeValue={(index, value) => {
              //  console.log('$::', index);
              setMonth({ index });
            }}
            elementHeight={30}
            containerStyle={styles.containerStyle}
            selectedLayoutStyle={styles.monthSelectedLayoutStyle}
            elementTextStyle={styles.elementTextStyle}
            ref={pickerRef1}
          />

          <WheelPicker
            restElements={2}
            data={yearList}
            initialSelectedIndex={yearIndex}
            selectedIndex={year.index ?? 0}
            onChangeValue={(index, value) => {
              setYear({ index });
            }}
            containerStyle={styles.containerStyle}
            selectedLayoutStyle={styles.yearSelectedLayoutPicker}
            elementHeight={30}
            elementTextStyle={styles.elementTextStyle}
            ref={pickerRef2}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "700",
    color: "black",
  },
  wheelPickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  monthSelectedLayoutStyle: {
    backgroundColor: "#F4F4F5",
    borderRadius: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  elementTextStyle: { fontSize: 20, textAlign: "left" },
  containerStyle: { flex: 1 },
  minutesSelectedLayoutStyle: {
    backgroundColor: "#D3D3D366",
    borderRadius: 0,
  },
  yearSelectedLayoutPicker: {
    backgroundColor: "#F4F4F5",
    borderRadius: 0,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: "700",
    color: "black",
    marginVertical: 5,
  },
});

export default TimePicker;
