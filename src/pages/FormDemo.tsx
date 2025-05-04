import React, { useState } from 'react';
import TextInput from '../components/TextInput';
import NumberInput from '../components/NumberInput';

const FormDemo: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px #0001' }}>
      <h2>表單元件測試</h2>
      <form autoComplete="off">
        <label style={{ display: 'block', marginBottom: 8 }}>
          姓名
          <TextInput
            placeholder="請輸入姓名"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
        <label style={{ display: 'block', marginBottom: 8 }}>
          年齡
          <NumberInput
            placeholder="請輸入年齡"
            value={age}
            onChange={e => setAge(e.target.value)}
            required
            min={1}
            max={120}
          />
        </label>
      </form>
      <div style={{ marginTop: 24, fontSize: '1rem' }}>
        <div>目前姓名：{name}</div>
        <div>目前年齡：{age}</div>
      </div>
    </div>
  );
};

export default FormDemo;
