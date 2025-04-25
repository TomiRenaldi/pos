import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useCart } from '../context/CartContext';

const CartScreen = () => {
  const { cart, increaseQty, decreaseQty, clearCart } = useCart();
  const [payment, setPayment] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const paid = parseInt(payment) || 0;
  const change = paid - total;

  const handlePayment = () => {
    if (paid < total) {
      Alert.alert('Pembayaran Kurang', 'Uang yang dibayar kurang dari total.');
      return;
    }

    Alert.alert(
      'Pembayaran Berhasil',
      `Kembalian: Rp${change.toLocaleString()}`,
      [{ text: 'OK', onPress: () => clearCart() }]
    );
    setPayment('');
  };
  

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-4">Keranjang Belanja</Text>

      {cart.length === 0 ? (
        <Text className="text-gray-500">Keranjang masih kosong</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="flex-row justify-between items-center mb-3 bg-gray-100 p-3 rounded-xl">
                <View>
                  <Text className="font-semibold">{item.name}</Text>
                  <Text className="text-gray-500">
                    Rp{item.price.toLocaleString()}
                  </Text>
                  <View className="flex-row mt-2 items-center space-x-2">
                    <TouchableOpacity
                      className="bg-red-500 px-3 py-1 rounded-full"
                      onPress={() => decreaseQty(item.id)}
                    >
                      <Text className="text-white font-bold">−</Text>
                    </TouchableOpacity>

                    <Text className="font-semibold text-lg">{item.quantity}</Text>

                    <TouchableOpacity
                      className="bg-blue-500 px-3 py-1 rounded-full"
                      onPress={() => increaseQty(item.id)}
                    >
                      <Text className="text-white font-bold">+</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text className="font-semibold text-right">
                  Rp{(item.price * item.quantity).toLocaleString()}
                </Text>
              </View>
            )}
          />


          <View className="mt-6">
            <Text className="text-lg font-semibold mb-2">
              Total: Rp{total.toLocaleString()}
            </Text>
            <TouchableOpacity
              className="bg-red-600 p-4 rounded-xl mb-4"
              onPress={clearCart}
            >
              <Text className="text-white text-center font-bold">Hapus Semua</Text>
            </TouchableOpacity>
            <View className="mt-4">
              <Text className="text-base font-semibold mb-2">Jumlah Uang Tunai:</Text>
              <TextInput
                keyboardType="numeric"
                value={payment}
                onChangeText={setPayment}
                className="border border-gray-300 rounded-xl px-4 py-2 mb-3"
                placeholder="Contoh: 100000"
              />

              <Text className="text-base">
                Total: Rp{total.toLocaleString()}
              </Text>
              <Text className="text-base mb-2">
                Kembalian: Rp{change > 0 ? change.toLocaleString() : 0}
              </Text>
            </View>
            <TouchableOpacity className="bg-green-600 p-4 rounded-xl" onPress={handlePayment}>
              <Text className="text-white text-center font-bold">Bayar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;
