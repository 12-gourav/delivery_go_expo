import ModalStyle from "@/styles/modal";
import { useState } from "react";
import {
  View,
  Text,
  Modal,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Fontisto from "@expo/vector-icons/Fontisto";
import { BlurView } from "expo-blur";

const FilterModal = ({
  isVisible,
  setIsVisible,
  start,
  setStart,
  end,
  setEnd,
  status,
  setStatus,
  setFilter,
  filter,
  data,
  fetchRecords,
  on,
  setOn
}) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleReset = async () => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    setStart(now);
    setEnd(now);
    setStatus("");
    setFilter({ start: "", end: "", status: "" });
    setIsVisible(false);
    setOn(false)
    await fetchRecords();
  };

  const apply = async () => {
    const newFilter = {
      status,
      start: on ? start : "",
      end: on ? end : "",
    };
    setFilter(newFilter);
    setIsVisible(false);
    await fetchRecords();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (on) count += 1;
    if (status) count += 1;
    return count > 0 ? `(${count})` : "";
  };


  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
        <BlurView style={ModalStyle.overlay} intensity={80} tint="dark">
          <View style={ModalStyle.container}>
            <View style={ModalStyle.heading}>
              <Text style={ModalStyle.headingText}>Filters</Text>
            </View>

            <View style={ModalStyle.form}>
              <Text style={ModalStyle.formText}>Date Range</Text>
              <View style={ModalStyle.group}>
                <TouchableOpacity
                  style={ModalStyle.date}
                  onPress={() => setOpen(true)}
                >
                  <Fontisto name="date" size={15} color="#474747" />
                  <Text>{new Date(start)?.toDateString()}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={ModalStyle.date}
                  onPress={() => setOpen2(true)}
                >
                  <Fontisto name="date" size={15} color="#474747" />
                  <Text>{new Date(end)?.toDateString()}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={ModalStyle.form}>
              <Text style={ModalStyle.formText}>Payment Status</Text>
              <View style={ModalStyle.tabs}>
                {data?.map((z) => (
                  <TouchableOpacity
                    key={z}
                    style={
                      status === z
                        ? ModalStyle.tabItemActive
                        : ModalStyle.tabItem
                    }
                    onPress={() => {
                      setStatus(status === z ? "" : z);
                    }}
                  >
                    <Text
                      style={
                        status === z
                          ? ModalStyle.tabItemTextActive
                          : ModalStyle.tabItemText
                      }
                    >
                      {z}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity style={ModalStyle.clear} onPress={handleReset}>
              <Text style={ModalStyle.clearText}>Clear All</Text>
            </TouchableOpacity>

            <TouchableOpacity style={ModalStyle.apply} onPress={apply}>
              <Text style={ModalStyle.applyText}>Apply {getActiveFilterCount()}</Text>
            </TouchableOpacity>

            {open && (
              <DateTimePicker
                value={new Date(start)}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(e, selectedDate) => {
                  if (selectedDate) {
                    setStart(selectedDate);
                    setOn(true);
                  }
                  setOpen(false);
                }}
              />
            )}

            {open2 && (
              <DateTimePicker
                value={new Date(end)}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(e, selectedDate) => {
                  if (selectedDate) {
                    setEnd(selectedDate);
                    setOn(true);
                  }
                  setOpen2(false);
                }}
              />
            )}
          </View>
        </BlurView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FilterModal;
