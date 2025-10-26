import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderStyle from "@/styles/order";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { primary } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import SearchBarWithFilter from "@/components/SearchBarWithFilter";
import FilterModal from "@/components/modals/FilterModal";
import { OrdersAPI } from "@/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "@/components/Loader";
import Nodata from "@/components/Nodata";

const StatusData = [
  "COMPLETE",
  "RTO",
  "CANCEL",
  "PENDING",
  "DISPATCH",
  "ASSIGN",
  "REJECTED BY ADMIN",
];

const order = () => {
  const [query, setQuery] = useState("");
  const [isVisible, setIsvisible] = useState(false);
  const [filter, setFilter] = useState({
    start: "",
    end: "",
    status: "",
    on: false,
  });
  const [start, setStart] = useState(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });

  const [end, setEnd] = useState(() => {
    const now = new Date();
    now.setHours(23, 59, 59, 999);
    return now;
  });

  const [status, setStatus] = useState("");
  const [state, setState] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [search, setSearch] = useState(false);
  const [hasMore, setHasMore] = useState(true);
    const [on, setOn] = useState(false);


  const handleSearch = () => {
    setSearch(!search);
  };

  const fetchRecords = useCallback(async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      let date: any = [];
      if (filter.start !== "" && filter.end !== "") {
        date = [start, end];
      }
      const result = await OrdersAPI(current,date, query,status, token);
      if (result?.data?.data) {
        const newData = result?.data?.data || [];
        setHasMore(newData.length === 10);
        if (current === 1) {
          setState(newData);
        } else {
          const temp = [...state, ...newData];
          setState(temp);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [ search, current]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setCurrent((prev) => prev + 1);
    }
  };



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fafafa" }}>
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={OrderStyle.heading}>Order History</Text>
        <Text style={OrderStyle.dis}>
          View and manage all your past and upcoming orders in one place.
        </Text>

        <SearchBarWithFilter
          query={query}
          setQuery={setQuery}
          setIsvisible={setIsvisible}
          handleSearch={handleSearch}
          placeholder="Search by product name"
        />

        <View style={OrderStyle.filters}>
          {filter.status !== "" && (
            <View style={OrderStyle.filter_tag}>
              <Text style={OrderStyle.filterTagText}>{filter.status}</Text>
            </View>
          )}
          {filter.start !== "" && filter.end !== "" && (
            <View style={OrderStyle.filter_tag}>
              <Text style={OrderStyle.filterTagText}>
                {new Date(filter.start).toLocaleDateString()} -{" "}
                {new Date(filter.end).toLocaleDateString()}
              </Text>
            </View>
          )}
        </View>


        {state?.length === 0 && loading === false ? (
          <Nodata message="No Orders Exist" />
        ) : (
          <FlatList
            style={{ flex: 1, marginTop: 20 }}
            data={state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <TrackingCard item={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            refreshing={loading}
            onRefresh={() => {
              setCurrent(1);
              setHasMore(true);
              fetchRecords();
            }}
          />
        )}

        {isVisible && (
          <FilterModal
            isVisible={isVisible}
            setIsVisible={setIsvisible}
            start={start}
            setStart={setStart}
            end={end}
            setEnd={setEnd}
            status={status}
            setStatus={setStatus}
            setFilter={setFilter}
            filter={filter}
            data={StatusData}
            fetchRecords={handleSearch}
            on={on}
            setOn={setOn}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default order;

export const TrackingCard: React.FC<any> = ({ item }) => {
  const router = useRouter();
  return (
    <View style={OrderStyle.card}>
      <View style={OrderStyle.top}>
        <View style={OrderStyle.bar}>
          <Text style={OrderStyle.h1} numberOfLines={1} ellipsizeMode="tail">
            {item?.product[0]?.name}
          </Text>
          <Text style={OrderStyle.date}>
            {new Date(item?.orderDate).toDateString()}{" "}
            {new Date(item?.orderTime).toLocaleTimeString()}
          </Text>
        </View>
        <Image
          style={OrderStyle.img}
          source={item?.product[0]?.img[0]?.url?.replace("http", "https")}
          contentFit="cover"
        />
      </View>
      <View style={OrderStyle.address}>
        <View style={OrderStyle.pin}>
          <Ionicons name="storefront-outline" size={15} color={primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={OrderStyle.p} numberOfLines={2} ellipsizeMode="tail">
            {item?.shop?.shop?.shopName} -{" "}
            {item?.shop?.shop?.shopAddress +
              ", " +
              item?.shop?.shop?.shopZipCode}
          </Text>
        </View>
      </View>
      <View style={{ ...OrderStyle.address, marginTop: 30 }}>
        <View style={OrderStyle.pin2}>
          <Feather name="map-pin" size={15} color={primary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={OrderStyle.p} numberOfLines={2} ellipsizeMode="tail">
            {item?.shippingAddress?.address}
          </Text>
        </View>
      </View>
      <View style={OrderStyle.line}></View>
      <View style={OrderStyle.last}>
        <View style={OrderStyle.wrapText}>
          <MaterialIcons name="currency-rupee" size={15} color={primary} />
          <Text style={OrderStyle.ptext}>
            {item?.totalAmount + item?.deliveryFee}
          </Text>
        </View>

        <Text
          style={
            item.orderStatus === "ASSIGN"
              ? OrderStyle.ASSIGN
              : item.orderStatus === "DISPATCH"
              ? OrderStyle.DISPATCH
              : item.orderStatus === "COMPLETE"
              ? OrderStyle.COMPLETE
              : OrderStyle.CANCEL
          }
        >
          {item.orderStatus}
        </Text>
        <TouchableOpacity
          style={{ ...OrderStyle.wrapText, gap: 5 }}
          onPress={() => router.push(`/(external)/${item?._id}`)}
        >
          <Text style={OrderStyle.ptext}>See More</Text>
          <AntDesign name="arrowright" size={14} color={primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
