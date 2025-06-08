import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { API_URL_CADASTRO } from '@env'

export default function Signup() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCpf] = useState('');

  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const [loadingCep, setLoadingCep] = useState(false);
  const [loadingCadastro, setLoadingCadastro] = useState(false);

  const buscarCep = async () => {
    if (cep.length !== 8) {
      Alert.alert('CEP inválido', 'O CEP deve ter 8 dígitos.');
      return;
    }
    
    try {
      setLoadingCep(true);
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert('Opa!', 'CEP não encontrado.');
        setRua('');
        setBairro('');
        setCidade('');
        setEstado('');
      } else {
        setRua(data.logradouro);
        setBairro(data.bairro);
        setCidade(data.localidade);
        setEstado(data.uf);
      }
    } catch (error) {
      Alert.alert('Oops!', 'Não foi possível buscar o CEP.');
    } finally {
      setLoadingCep(false);
    }
  };

  const cadastrar = async () => {
    if (!nome || !email || !senha || !cep || !cpf) {
      Alert.alert('Calma lá!', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const payload = {
        nome,
        email,
        senha,
        cpf,
        endereco: {
          cep,
          logradouro: rua,
          bairro,
          cidade,
          uf: estado
        }
    };

    try {
      setLoadingCadastro(true);
      const response = await fetch(API_URL_CADASTRO, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        console.log('Payload enviado para API:', JSON.stringify(payload, null, 2));
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Vish!', 'Não foi possível realizar o cadastro.');
      }
    } catch (error) {
      Alert.alert('Não foi culpa sua!', 'Erro de conexão com o servidor.');
      console.log(error)
    } finally {
      setLoadingCadastro(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <View style={styles.form}>

        <TextInput
          placeholder="Nome"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          style={styles.input}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="CPF"
          placeholderTextColor="#aaa"
          style={styles.input}
          keyboardType="numeric"
          maxLength={11}
          value={cpf}
          onChangeText={setCpf}
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#aaa"
          style={styles.input}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <View style={styles.cepContainer}>
          <TextInput
            placeholder="CEP"
            placeholderTextColor="#aaa"
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            keyboardType="numeric"
            maxLength={8}
            value={cep}
            onChangeText={setCep}
          />
          <TouchableOpacity style={styles.cepButton} onPress={buscarCep}>
            {loadingCep ? <ActivityIndicator color="#fff" /> : <Text style={styles.cepButtonText}>Buscar</Text>}
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Rua"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={rua}
          onChangeText={setRua}
          editable={false}
        />

        <TextInput
          placeholder="Bairro"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={bairro}
          onChangeText={setBairro}
          editable={false}
        />

        <TextInput
          placeholder="Cidade"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={cidade}
          onChangeText={setCidade}
          editable={false}
        />

        <TextInput
          placeholder="Estado"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={estado}
          onChangeText={setEstado}
          editable={false}
        />

        <TouchableOpacity style={styles.button} onPress={cadastrar}>
          {loadingCadastro ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Cadastrar</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.loginLink}>Já tem uma conta? Entrar</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  title: {
    fontSize: 26,
    color: '#004080',
    fontWeight: '700',
    marginBottom: 12,
  },
  form: {
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#f0f8ff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    fontSize: 15,
    width: '100%',
    marginVertical: 5,
    color: '#000',
    borderWidth: 1,
    borderColor: '#cce6ff',
  },
  cepContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  cepButton: {
    backgroundColor: '#007ACC',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cepButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#007ACC',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  loginLink: {
    color: '#007ACC',
    fontWeight: '600',
    marginTop: 12,
    textDecorationLine: 'underline',
  },
});
