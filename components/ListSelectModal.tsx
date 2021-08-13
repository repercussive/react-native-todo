import React from 'react';
import { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-native-modal';
import AppContext from '../react-helpers/appContext';
import List, { listColors } from '../logic/list';

interface Props {
  isOpen: boolean,
  onEditList: (list: List) => void,
  hide: () => void
}

const ListSelectModal = ({ isOpen, onEditList, hide }: Props) => {
  const app = useContext(AppContext);

  function handleSelectList(list: List) {
    app.setActiveList(list);
    hide();
  }

  function handleEditList(list: List) {
    onEditList(list);
    hide();
  }

  return (
    <Modal
      isVisible={isOpen}
      onDismiss={hide}
      onBackdropPress={hide}
      onSwipeComplete={hide}
      swipeDirection="down"
      swipeThreshold={50}
      useNativeDriverForBackdrop
      style={styles.modal}>
      <View style={styles.container}>
        {app.lists.map((list, index) => (
          <View key={index} style={styles.row}>
            <TouchableOpacity
              style={styles.selectListButton}
              onPress={() => handleSelectList(list)}
              activeOpacity={0.6}>
              <FontAwesomeIcon icon={faCircle} color={listColors[list.colorId]} />
              <Text style={styles.listName}>{list.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editListButton}
              onPress={() => handleEditList(list)}>
              <FontAwesomeIcon icon={faEllipsisH} color="#8a8a8a" />
            </TouchableOpacity>
          </View>
        ))}
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
    backgroundColor: '#d9d9d9'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  selectListButton: {
    backgroundColor: 'white',
    height: 50,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexGrow: 1
  },
  listName: {
    marginLeft: 15
  },
  editListButton: {
    backgroundColor: 'white',
    height: 50,
    paddingHorizontal: 15,
    justifyContent: 'center',
  }
});

export default ListSelectModal;