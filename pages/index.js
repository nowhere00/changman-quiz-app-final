import { useState } from 'react';
import quizData from '../quizData_창만30문제.json';

export default function Home() {
  const [selected, setSelected] = useState(Array(quizData.length).fill(null));

  const handleSelect = (qIdx, opt) => {
    const newSelected = [...selected];
    newSelected[qIdx] = opt;
    setSelected(newSelected);
  };

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '720px', margin: 'auto' }}>
      <h1>창만 퀴즈 앱</h1>
      {quizData.map((q, idx) => {
        const userAnswer = selected[idx];
        return (
          <div key={idx} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
            <h2>Q{idx + 1}. {q.question}</h2>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {q.options.map((opt, i) => {
                const isCorrect = userAnswer && opt === q.answer;
                const isWrong = userAnswer === opt && opt !== q.answer;
                return (
                  <li key={i}
                      onClick={() => handleSelect(idx, opt)}
                      style={{
                        cursor: 'pointer',
                        padding: '0.5rem',
                        margin: '0.3rem 0',
                        borderRadius: '5px',
                        border: '1px solid #ddd',
                        backgroundColor: isCorrect ? '#c8f7c5' : isWrong ? '#f8cccc' : '#f9f9f9'
                      }}>
                    {opt}
                  </li>
                );
              })}
            </ul>
            {userAnswer && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                ✅ <strong>정답:</strong> {q.answer} <br />
                💡 {q.explanation}
              </div>
            )}
          </div>
        );
      })}
    </main>
  );
}