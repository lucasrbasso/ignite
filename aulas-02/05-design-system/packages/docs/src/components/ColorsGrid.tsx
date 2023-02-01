import { colors } from '@ignite-ui/tokens'
import { getContrast } from 'polished'

export function ColorsGrid() {
  return Object.entries(colors).map(([name, color]) => {
    return (
      <div key={name} style={{ backgroundColor: color, padding: '2rem' }}>
        <div
          style={{
            display: 'flex',
            fontWeight: 'bold',
            justifyContent: 'space-between',
            fontFamily: 'monospace',
            color: getContrast(color, '#FFF') < 3.5 ? '#000' : '#FFF',
          }}
        >
          <strong>${name}</strong>
          <span>{color}</span>
        </div>
      </div>
    )
  })
}
