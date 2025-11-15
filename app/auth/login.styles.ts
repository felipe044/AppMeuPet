import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#FFFFFF',
  },

  formContainer: {
    width: '100%',
    gap: 16, // espaço entre os elementos (React Native 0.71+)
  },

  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F7F7F7',
  },

  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#2F80ED',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 8,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  registerText: {
    marginTop: 32,
    fontSize: 14,
    color: '#555',
  },

  registerLink: {
    color: '#2F80ED',
    fontWeight: 'bold',
  },
   label: {
    fontSize: 14,
    fontWeight: '500',
    paddingLeft: 10

  },
});

export default styles;
