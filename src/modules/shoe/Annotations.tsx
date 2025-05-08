import { Html } from '@react-three/drei'
import { useState } from 'react'

export interface Annotation {
  id: number
  title: string
  description: string
  targetNodeName: string;
  position: [number, number, number]
  camPos: {
    x: number;
    y: number;
    z: number;
  }
  lookAt: {
    x: number;
    y: number;
    z: number;
}
}

export const annotations: Annotation[] = [
  {
    id: 1,
    title: 'Left auricle',
    targetNodeName: 'left-auricle',
    description: 'Ear-like flap overlying the left atrium',
    position: [-0.5, 1.2, -1],
    camPos: { x: 1, y: 100, z: 1 },
    lookAt: { x: -0.5, y: 1.2, z: 0.3 }
  },
  {
    id: 2,
    title: 'Right auricle',
    targetNodeName: 'right-auricle',
    description: 'Ear-like flap overlying the right atrium',
    position: [0.6, 1.1, 0.4],
    camPos: { x: 1, y: 1, z: 1 },
    lookAt: { x: 0.6, y: 1.1, z: 0.4 }
  },
  {
    id: 3,
    title: 'Pulmonary trunk',
    targetNodeName: 'pulmonary-trunk',
    description: 'Major artery conducting blood from the right ventricle to the lungs',
    position: [0.2, 1.6, 0.1],
    camPos: { x: 1, y: 1, z: 1 },
    lookAt: { x: 0.2, y: 1.6, z: 0.1 }
  },
  {
    id: 4,
    title: 'Ascending aorta',
    targetNodeName: 'ascending-aorta',
    description: '',
    position: [0.1, 1.8, 0.3],
    camPos: { x: 1, y: 1, z: 1 },
    lookAt: { x: 0.1, y: 1.8, z: 0.3 }
  },
  {
    id: 5,
    title: 'Arch of the aorta',
    targetNodeName: 'arch-of-the-aorta',
    description: '',
    position: [0.0, 2.0, 0.0],
    camPos: { x: 1, y: 1, z: 1 },
    lookAt: { x: 0.0, y: 2.0, z: 0.0 }
  },
  {
    id: 6,
    title: 'Descending aorta',
    targetNodeName: 'descending-aorta',
    description: '',
    position: [-0.2, 1.5, -0.3],
    camPos: { x: 1, y: 1, z: 1 },
    lookAt: { x: -0.2, y: 1.5, z: -0.3 }
  },
  {
    id: 7,
    title: 'Brachiocephalic artery',
    targetNodeName: 'brachiocephalic-artery',
    description: 'Major vessel supplying blood to the right upper limb, right side of neck, head and brain',
    position: [0.3, 2.1, 0.1],
    camPos: { x: 1, y: 1, z: 1 },
    lookAt: { x: 0.3, y: 2.1, z: 0.1 }
  },
  {
    id: 8,
    title: 'Left common carotid artery',
    targetNodeName: 'left-common-carotid-artery',
    description: 'Supplying the left side of the head, neck and brain',
    position: [-0.4, 2.1, 0.2],
    camPos: { x: 1, y: 1, z: 1 },
    lookAt: { x: -0.4, y: 2.1, z: 0.2 }
  },
  {
    id: 9,
    title: 'Left subclavian artery',
    targetNodeName: 'left-subclavian-artery',
    description: 'Supplying the left upper limb',
    position: [-0.6, 2.0, 0.2],
    camPos: { x: 1, y: 1, z: 1 },
    lookAt: { x: -0.6, y: 2.0, z: 0.2 }
  },
  {
    id: 10,
    title: 'Superior vena cava',
    targetNodeName: 'superior-vena-cava',
    description: 'Draining blood from the upper limbs, head, neck and brain',
    position: [0.5, 1.7, -0.2],
    camPos: { x: 1, y: 1, z: 1 },
    lookAt: { x: 0.5, y: 1.7, z: -0.2 }
  }
];

interface AnnotationsProps {
  onSelectAnnotation: (annotation: Annotation) => void;
}

export const Annotations = ({ onSelectAnnotation}: AnnotationsProps) => {
  const [selected, setSelected] = useState<Annotation | null>(null)
  const handleClick = (annotation: Annotation) => {
    setSelected(annotation)
    onSelectAnnotation(annotation)
  }

  return (
    <group position={[0,-2,0]}>
      {annotations.map((annotation, index) => {
        return (
          <Html key={index} position={[annotation.lookAt.x, annotation.lookAt.y, annotation.lookAt.z]}>
            <svg onClick={() => handleClick(annotation)} height="34" width="34" transform="translate(-16 -16)" style={{ cursor: 'pointer' }}>
              <circle
                cx="17"
                cy="17"
                r="16"
                stroke="white"
                strokeWidth="2"
                fill="rgba(0,0,0,.66)"
              />
              <text x="12" y="22" fill="white" fontSize={17} fontFamily="monospace" style={{ pointerEvents: 'none' }}>
                {index + 1}
              </text>
            </svg>
            {annotation.description && annotation.id === selected?.id && (
              <div className='relative annotationDescription'>
                <h3 className="text-white font-bold pb-4 text-lg">{annotation.title}</h3>
                <div id={'desc_' + index} className="" dangerouslySetInnerHTML={{ __html: annotation.description }} />
                <button onClick={() => setSelected(null)} className="absolute top-1 right-2 text-white text-md">close</button>
              </div>
            )}
        </Html>
        )
      })}
    </group>
  )
}
