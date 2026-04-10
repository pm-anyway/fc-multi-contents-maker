import { C } from '../constants';

interface TagProps {
  children: React.ReactNode;
  color?: string;
}

export const Tag: React.FC<TagProps> = ({ children, color = C.amber }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      background: `${color}18`,
      border: `1.5px solid ${color}50`,
      borderRadius: 100,
      padding: '10px 28px',
    }}
  >
    <div
      style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 8px ${color}`,
      }}
    />
    <span
      style={{
        color,
        fontSize: 28,
        fontFamily: 'monospace',
        fontWeight: 600,
        letterSpacing: 1,
      }}
    >
      {children}
    </span>
  </div>
);
