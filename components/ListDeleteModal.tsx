import React from 'react';
import { Keyboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import List, { listColors } from '../logic/list';
import { useContext } from 'react';
import AppContext from '../react-helpers/appContext';

interface Props {
  listBeingDeleted: List | null,
  hide: () => void
}

const ListDeleteModal = ({ listBeingDeleted, hide }: Props) => {
  const app = useContext(AppContext);
  const listTasksCount = listBeingDeleted?.tasks.length;

  function handleCancel() {
    Keyboard.dismiss();
    hide();
  }

  function handleDelete() {
    app.deleteList(listBeingDeleted!);
    hide();
  }

  return (
    <Modal
      onDismiss={hide}
      isVisible={!!listBeingDeleted}
      onBackdropPress={hide}
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      style={styles.modal}>
      <View style={styles.container}>
        <Text style={styles.confirmationText}>
          Delete <Text style={styles.listName}>{listBeingDeleted?.name}</Text>?
        </Text>
        <View style={styles.taskWarningTextContainer}>
          <Text>
            {listTasksCount} task{listTasksCount === 1 ? '' : 's'} will be removed.
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleCancel}>
            <Text style={[styles.buttonText, { color: '#878787' }]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            style={styles.button}>
            <Text style={[styles.buttonText, { color: '#d9554c' }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  container: {
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  listName: {
    color: '#d9554c',
    fontWeight: '700'
  },
  confirmationText: {
    marginTop: 10,
    marginBottom: 8
  },
  taskWarningTextContainer: {
    width: '100%',
    height: 40,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#f0f0f0',
    borderWidth: 1.5,
    borderRadius: 10,
    marginVertical: 10
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    paddingVertical: 10
  },
  buttonText: {
    fontWeight: '700',
    borderBottomColor: 'gray'
  }
});

export default ListDeleteModal;