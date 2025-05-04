import React, { useState, useCallback, Fragment } from 'react';
import Card from './Card';
import Button from './Button';
// import CopyButton from './CopyButton'; // Library has built-in copy
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'; // Remove indent select
import JsonView from '@uiw/react-json-view'; // Import the new library
import { lightTheme } from '@uiw/react-json-view/light'; // Optional: Import a theme
import { isValidJsonString } from '../utils/jsonUtils'; // Keep validation
// Remove formatJsonString import if no longer needed elsewhere
import '../styles/tools.css';

export const JsonParser: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>('');
  // const [formattedJson, setFormattedJson] = useState<string>(''); // Remove formatted string state
  const [jsonObject, setJsonObject] = useState<object | null>(null); // State for parsed object
  const [error, setError] = useState<string>('');
  // const [indent, setIndent] = useState<string>('2'); // Remove indent state

  // Rename handleFormat to handleParse or similar
  const handleParseAndDisplay = useCallback(() => {
    setError('');
    // setFormattedJson(''); // Remove
    setJsonObject(null); // Clear previous object

    if (!jsonInput.trim()) {
      return;
    }

    if (!isValidJsonString(jsonInput)) {
      setError('錯誤：輸入的不是有效的 JSON 格式。');
      return;
    }

    try {
        const parsed = JSON.parse(jsonInput);
        setJsonObject(parsed);
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(`JSON 解析錯誤：${err.message}`);
        } else {
            setError('JSON 解析時發生未知錯誤。');
        }
    }

  }, [jsonInput]);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(event.target.value);
    setError('');
    // setFormattedJson(''); // Remove
    setJsonObject(null); // Clear parsed object on input change
  }, []);

  // Remove handleIndentChange callback

  return (
    // Use Fragment to return multiple sibling Cards
    <Fragment>
      {/* Card 1: Input */}
      <Card>
        <h2>JSON 輸入</h2>
        <p>在此貼上您的 JSON 字串。</p>
        <div className="form-group">
          {/* <label htmlFor="json-input">JSON 輸入</label> */}
          <textarea
            id="json-input"
            value={jsonInput}
            onChange={handleInputChange}
            placeholder='{\n  "key": "value",\n  "number": 123,\n  "nested": {\n    "array": [1, 2, 3]\n  }\n}'
            rows={15}
            className={`w-full p-2 border rounded font-mono text-sm ${error ? 'border-red-500' : 'border-gray-300'}`}
            style={{ minHeight: '300px' }}
          />
          {error && <p className="error-text">{error}</p>}
        </div>
         <div className="button-row justify-start items-center">
            <Button onClick={handleParseAndDisplay} disabled={!jsonInput.trim()}>驗證並顯示</Button>
         </div>
      </Card>

      {/* Card 2: Output - Always render the card */}
      {/* {jsonObject && ( */}
        <Card>
          <h2>JSON 結構預覽</h2>
          <p>可互動的樹狀檢視。</p>
          {/* Conditionally render JsonView or placeholder inside the card */}
          <div className="form-group border rounded p-1" style={{ minHeight: '300px' }}>
            {jsonObject ? (
               <JsonView
                  value={jsonObject}
                  style={lightTheme}
                  displayDataTypes={true}
                  enableClipboard={true}
                  displayObjectSize={true}
                />
            ) : (
              <div className="text-gray-400 text-sm p-4 h-full flex items-center justify-center">
                輸入有效的 JSON 並點擊 &apos;驗證並顯示&apos; 後，將在此預覽結構。
              </div>
            )}
          </div>
        </Card>
      {/* )} */}
    </Fragment>
  );
};
