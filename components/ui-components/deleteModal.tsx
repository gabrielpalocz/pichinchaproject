import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';

interface BottomSheetProps {
  id: string;
  name: string;
  visible: boolean;
  onClose: () => void;
  handleDelete: (value: string) => Promise<void>;
}

const DeleteModal: React.FC<BottomSheetProps> = ({
  id,
  name,
  visible,
  onClose,
  handleDelete,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.backdrop} />
        <View style={styles.bottomSheet}>
          <View style={styles.headContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.textQuestion}>
              ¿Estás seguro de eliminar el producto {name}?
            </Text>
          </ScrollView>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => handleDelete(id)}>
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomSheet: {
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: 300,
  },
  headContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f1f2',
    alignItems: 'flex-end',
  },
  closeButton: {
    padding: 10,
    marginRight: 10,
  },
  closeText: {
    fontSize: 18,
    color: 'black',
  },
  scrollContainer: {
    padding: 20,
  },
  textQuestion: {
    color: 'black',
    textAlign: 'center',
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    borderTopColor: '#f0f1f2',
    borderTopWidth: 1,
    paddingTop: 20,
  },
  confirmButton: {
    backgroundColor: '#ffdd00',
    borderRadius: 5,
    marginBottom: 10,
    paddingVertical: 15,
  },
  confirmButtonText: {
    color: '#203668',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#e9ecf3',
    borderRadius: 5,
    paddingVertical: 15,
  },
  cancelButtonText: {
    color: '#203668',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default DeleteModal;
