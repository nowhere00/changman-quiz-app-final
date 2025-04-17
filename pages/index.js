import { useState, useEffect } from 'react';
import quizData from '../quizData_창만30문제.json';

// 옵션 셔플 함수
function shuffleOptions(options) {
  return [...options].sort(() => Math.random() - 0.5);
}

export default function Home() {
  const [shuffledData, setShuffledData] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const randomized = quizData.map(q => {
      const shuffled = shuffleOptions(q.options);
      return {
        ...q,
        shuffledOptions: shuffled,
        correctIndex: shuffled.indexOf(q.answer)
      };
    });
    setShuffledData(randomized);
    setSelected(Array(randomized.length).fill(null));
  }, []);

  const handleSelect = (qIdx, optIdx) => {
    const newSelected = [...selected];
    newSelected[qIdx] = optIdx;
    setSelected(newSelected);
  };

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '720px', margin: 'auto' }}>
      <h1>창만 퀴즈 앱</h1>
      {shuffledData.map((q, idx) => {
        const userAnswerIdx = selected[idx];
        return (
          <div key={idx} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
            <h2>Q{idx + 1}. {q.question}</h2>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {q.shuffledOptions.map((opt, i) => {
                const isCorrect = userAnswerIdx === i && i === q.correctIndex;
                const isWrong = userAnswerIdx === i && i !== q.correctIndex;
                return (
                  <li key={i}
                      onClick={() => handleSelect(idx, i)}
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
            {userAnswerIdx !== null && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                ✅ <strong>정답:</strong> {q.shuffledOptions[q.correctIndex]} <br />
                💡 {q.explanation}
              </div>
            )}
          </div>
        );
      })}
    </main>
  );
}