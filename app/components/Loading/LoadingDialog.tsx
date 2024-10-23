import { Colors } from "@/app/constants/Colors";
import React from "react";
import { View, ActivityIndicator, StyleSheet, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoadingDialog = () => {
  return (
    <Modal transparent={true} animationType="none" visible={true}>
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#F5C518" />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.translucentBlack03,
  },
  loadingBox: {
    width: 100,
    paddingVertical: 20,
    backgroundColor: Colors.translucentGray06,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

export default LoadingDialog;
