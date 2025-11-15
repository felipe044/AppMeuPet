import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { Stack } from 'expo-router';
import styles from './styles/pets.styles';
import { useRouter } from "expo-router"
import { useState, useEffect } from 'react';
import { getAllPets } from '../../services/firebase/petService';

export default function Pets() {
  const [pets, setPets] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    async function loadPets() {
      try {
        const data = await getAllPets();
        setPets(data);
      } catch (error) {
        console.log("Erro ao carregar pets:", error);
      }
    }
    loadPets();
  }, [])


  return (
    <View style={styles.container}>

      <Stack.Screen options={{ headerShown: false }} />

      <Text style={styles.title}>Meus Pets</Text>

      <FlatList
        data={pets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push(
            { pathname: '/pets/[id]', params: { id: item.id, nome: item.nome, raca: item.raca } })}>
            <View style={styles.petIconWrapper}>
              
            </View>
            <View style={styles.petInfo}>
              <Text style={styles.petName}>{item.nome}</Text>
              <Text style={styles.petBreed}>{item.raca}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={() => router.push('/pets/newPet')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
