import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { products } from '../data/product';
import { useCart } from '../context/CartContext';
import { useRouter } from 'expo-router';

const ProductListScreen = () => {
  const { addToCart } = useCart();
  const router = useRouter()

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-4">Daftar Produk</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center mb-3 p-3 bg-gray-100 rounded-xl">
            <View>
              <Text className="text-base font-semibold">{item.name}</Text>
              <Text className="text-gray-500">Rp{item.price.toLocaleString()}</Text>
            </View>
            <TouchableOpacity
              className="bg-blue-500 px-4 py-2 rounded-xl"
              onPress={() => addToCart(item)}
            >
              <Text className="text-white font-semibold">Tambah</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        className="bg-green-600 mt-6 py-4 rounded-xl"
        onPress={() => router.push('/cart')}
      >
        <Text className="text-white text-center font-bold">Lihat Keranjang</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductListScreen;
