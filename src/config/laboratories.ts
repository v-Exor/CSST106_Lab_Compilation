export type Category = 'Image processing' | 'Feature detection' | 'Machine learning' | 'Upcoming'
export type LabStatus = 'awaiting-materials' | 'awaiting-instructions' | 'in-progress' | 'available'

export interface Laboratory {
  id: string
  title: string
  subtitle: string
  description: string
  category: Category
  tags: string[]
  icon: 'image' | 'edges' | 'histogram' | 'features' | 'pca' | 'detection' | 'upcoming'
  status: LabStatus
  liveUrl: string
  embed: boolean
  reportUrl: string
  objectives: string[]
  input: string
  output: string
  note: string
}

/** Configure deployed activity website URLs here.
 * Set embed=true only after checking that the deployed app supports embedding.
 * Status is independent of links: only use 'available' after verifying the actual lab.
 * Topic-level descriptions below come from the master brief, not unseen lab reports.
 */
export const laboratories: Laboratory[] = [
  {
    id: '01', title: 'Images', subtitle: 'Start with the pixels.', icon: 'image',
    description: 'Explore the building blocks of digital images and the foundations of image processing.',
    category: 'Image processing', tags: ['Image fundamentals', 'Image processing'], status: 'awaiting-materials',
    liveUrl: 'https://v-exor.github.io/amber/', reportUrl: '', embed: false,
    objectives: ['Explore image fundamentals and basic image processing.', 'Review the specific operations when the laboratory instructions are supplied.'],
    input: 'Images in the formats specified by the activity instructions.',
    output: 'Original and processed image comparisons, as required by the activity.',
    note: 'The activity document and implementation have not been supplied. Required operations, procedures, and results are pending.',
  },
  {
    id: '02', title: 'Edge Detection', subtitle: 'Find where things change.', icon: 'edges',
    description: 'Discover how intensity changes reveal boundaries, shapes, and the structure of an image.',
    category: 'Image processing', tags: ['Edges', 'Image gradients'], status: 'awaiting-materials',
    liveUrl: 'https://v-exor.github.io/birch/', reportUrl: '', embed: false,
    objectives: ['Explore edge detection techniques.', 'Compare the algorithms and parameters specified in the activity document.'],
    input: 'An image and any parameters required by the documented algorithms.',
    output: 'Edge maps and comparisons with the original image.',
    note: 'Specific detectors, thresholds, and comparisons must be confirmed against the laboratory document.',
  },
  {
    id: '03', title: 'Histogram Analysis', subtitle: 'See the story in the distribution.', icon: 'histogram',
    description: 'Understand image intensity distributions and the insights hidden in every histogram.',
    category: 'Image processing', tags: ['Intensity distribution', 'Histograms'], status: 'awaiting-materials',
    liveUrl: 'https://v-exor.github.io/cedar/', reportUrl: '', embed: false,
    objectives: ['Explore image histogram analysis.', 'Review the histogram operations required by the supplied instructions.'],
    input: 'An image for intensity distribution analysis.',
    output: 'Histogram visualizations and any processed images required by the activity.',
    note: 'The document is needed to confirm whether equalization or other histogram processing is required.',
  },
  {
    id: '04', title: 'SURF Feature Detection', subtitle: 'Find the points that matter.', icon: 'features',
    description: 'Explore distinctive image features with Speeded-Up Robust Features and feature matching.',
    category: 'Feature detection', tags: ['SURF', 'Local features'], status: 'awaiting-materials',
    liveUrl: 'https://v-exor.github.io/drift/', reportUrl: '', embed: false,
    objectives: ['Study Speeded-Up Robust Features.', 'Review the required feature detection and related outputs in the activity document.'],
    input: 'Image inputs specified by the SURF laboratory instructions.',
    output: 'Feature visualizations and related outputs from the actual SURF implementation.',
    note: 'SURF browser execution has library-build and support limitations. The independent implementation must document its runtime. An ORB or SIFT demonstration must never be labeled as SURF.',
  },
  {
    id: '05', title: 'PCA in Computer Vision', subtitle: 'Less data. More understanding.', icon: 'pca',
    description: 'Discover how principal components reveal patterns and reduce the dimensions of visual data.',
    category: 'Machine learning', tags: ['PCA', 'Dimensionality reduction'], status: 'awaiting-materials',
    liveUrl: 'https://v-exor.github.io/ember/', reportUrl: '', embed: false,
    objectives: ['Explore Principal Component Analysis in computer vision.', 'Review the image analysis or transformation tasks in the activity document.'],
    input: 'Images or visual datasets specified in the activity instructions.',
    output: 'Component visualizations or reconstruction comparisons, if required by the activity.',
    note: 'Dataset, component selection, reconstruction requirements, and results await the laboratory document.',
  },
  {
    id: '06', title: 'YOLOv8 Object Detection', subtitle: 'Give every object a name.', icon: 'detection',
    description: 'Explore how an object detector locates and classifies multiple objects in visual scenes.',
    category: 'Machine learning', tags: ['YOLOv8', 'Object detection'], status: 'awaiting-materials',
    liveUrl: 'https://v-exor.github.io/flint/', reportUrl: '', embed: false,
    objectives: ['Explore object detection using YOLOv8.', 'Review input requirements and inference outputs against the laboratory instructions.'],
    input: 'Images or supported video inputs, as defined by the independent implementation.',
    output: 'Real inference results with bounding boxes, class labels, and confidence scores.',
    note: 'The independent lab must perform real inference before being marked available. GitHub Pages cannot run a Python server. No model or verified detections have been supplied.',
  },
  {
    id: '07', title: 'Segmentation Technique', subtitle: 'A new perspective is on its way.', icon: 'upcoming',
    description: 'A place for the next laboratory activity. Its topic will be added when instructions are available.',
    category: 'Upcoming', tags: ['Topic to be defined'], status: 'awaiting-instructions',
    liveUrl: 'https://v-exor.github.io/grove/', reportUrl: '', embed: false,
    objectives: [], input: 'Awaiting laboratory instructions.', output: 'Awaiting laboratory instructions.',
    note: 'The topic, algorithms, procedures, and results of Laboratory 07 have not been defined.',
  },
]

export const categories = ['All activities', 'Image processing', 'Feature detection', 'Machine learning', 'Upcoming'] as const
export const statusLabels: Record<LabStatus, string> = {
  'awaiting-materials': 'Materials pending',
  'awaiting-instructions': 'Instructions pending',
  'in-progress': 'In progress',
  available: 'Available',
}

/** Only explicit HTTPS URLs become external destinations or iframe sources. */
export function safeUrl(value: string): string | undefined {
  if (!value || value !== value.trim()) return undefined
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : undefined
  } catch { return undefined }
}
