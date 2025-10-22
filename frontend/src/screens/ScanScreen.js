// // ScanScreen.js: Màn hình quét QR dùng expo-barcode-scanner.

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';
// import { Button } from 'react-native-paper';
// import api from '../api/axiosInstance';
// import Toast from 'react-native-toast-message';

// const ScanScreen = () => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [scanned, setScanned] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } = await BarCodeScanner.requestPermissionsAsync();
//       setHasPermission(status === 'granted');
//     })();
//   }, []);

//   const handleBarCodeScanned = ({ data }) => {
//     setScanned(true);
//     api.post('/scan', { code: data })
//       .then(res => Toast.show({ type: 'success', text1: `Đã thêm thẻ ${res.data.title}` }))
//       .catch(err => Toast.show({ type: 'error', text1: 'Lỗi scan' }));
//   };

//   if (hasPermission === null) return <Text>Requesting camera permission</Text>;
//   if (hasPermission === false) return <Text>No access to camera</Text>;

//   return (
//     <View style={styles.container}>
//       <BarCodeScanner
//         onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
//         style={StyleSheet.absoluteFillObject}
//       />
//       {scanned && <Button onPress={() => setScanned(false)}>Scan again</Button>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
// });

// export default ScanScreen;