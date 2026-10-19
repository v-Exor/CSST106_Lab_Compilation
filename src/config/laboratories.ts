export type Category = 'Image processing' | 'Feature detection' | 'Machine learning'
export type LabStatus = 'instructions-ready' | 'awaiting-materials' | 'awaiting-instructions' | 'in-progress' | 'available'

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
  procedure: string
  objectives: string[]
  input: string
  output: string
  note: string
}

/** Configure deployed activity website URLs here.
 * Set embed=true only after checking that the deployed app supports embedding.
 * Status is independent of links: only use 'available' after verifying the actual lab.
 * Objectives and procedures below are based on the supplied activity handouts.
 */
export const laboratories: Laboratory[] = [
  {
    id: '01', title: 'Images', subtitle: 'Start with the pixels.', icon: 'image',
    description: "Explore digital image representation, color channels, pixel values, and basic image manipulation with OpenCV.",
    category: 'Image processing', tags: ["Pixels and channels", "Grayscale", "Image manipulation"], status: 'instructions-ready',
    liveUrl: 'https://v-exor.github.io/amber/', reportUrl: 'reports/activity-01-instructions.docx', embed: false,
    objectives: ["Explain image dimensions, intensity values, resolution, and BGR color ordering.", "Load and display images, convert to grayscale, and inspect or change individual pixels.", "Crop a region of interest, resize images, and rotate an image by 90 degrees."],
    input: "Color or grayscale images and the parameters for pixel edits, cropping, resizing, or rotation.",
    output: "Original, grayscale, and manipulated images with a short report explaining the operations.",
    note: "The handout asks for a hardcopy report and screenshots of the original, grayscale, and manipulated images.",
    procedure: "Load and inspect a color image, convert it to grayscale, examine and edit a pixel, then crop, resize, and rotate it. Record the steps and what each operation changes.",
  },
  {
    id: '02', title: 'Edge Detection', subtitle: 'Find where things change.', icon: 'edges',
    description: "Apply Sobel and Canny edge detection to a smoothed grayscale image and compare the resulting edge maps.",
    category: 'Image processing', tags: ["Sobel", "Canny", "Gaussian smoothing"], status: 'instructions-ready',
    liveUrl: 'https://v-exor.github.io/birch/', reportUrl: 'reports/activity-02-instructions.docx', embed: false,
    objectives: ["Preprocess an input image in grayscale using Gaussian smoothing.", "Compute Sobel derivatives and magnitude, then apply Canny edge detection.", "Compare how the two methods represent edges and explain their uses in computer vision."],
    input: "An image converted to grayscale, a Gaussian blur setting, and edge-detector parameters.",
    output: "Original grayscale image, Sobel magnitude, and Canny edge maps with an explanation of their differences.",
    note: "The handout covers Sobel and Canny edge detection and asks for an explanation of the program and its output.",
    procedure: "Load the grayscale input, apply Gaussian smoothing, calculate Sobel x/y gradients and magnitude, and run Canny on the same smoothed image. Display and compare the outputs.",
  },
  {
    id: '03', title: 'Histogram Analysis', subtitle: 'See the story in the distribution.', icon: 'histogram',
    description: "Enhance image contrast with histogram equalization, contrast stretching, and CLAHE, then compare images and intensity distributions.",
    category: 'Image processing', tags: ["Histogram equalization", "Contrast stretching", "CLAHE"], status: 'instructions-ready',
    liveUrl: 'https://v-exor.github.io/cedar/', reportUrl: 'reports/activity-03-instructions.docx', embed: false,
    objectives: ["Apply global histogram equalization to grayscale images or the luminance channel of color images.", "Compare linear contrast stretching and adaptive histogram equalization using CLAHE.", "Inspect visibility, histograms, noise, and artifacts and answer the five handout questions."],
    input: "Grayscale or color images with varying contrast and parameters for contrast adjustment.",
    output: "Original, equalized, stretched, and CLAHE images with histograms, observations, and written answers.",
    note: "The handout includes four parts covering equalization, contrast adjustment, implementation, and observations, followed by five questions.",
    procedure: "Plot the original histogram, apply global equalization, contrast stretching, and CLAHE, and compare the processed images and histograms. Record detail visibility, contrast, noise, and artifacts.",
  },
  {
    id: '04', title: 'SURF Feature Detection', subtitle: 'Find the points that matter.', icon: 'features',
    description: "Study SURF keypoints and descriptors, match features between images, and compare SURF with SIFT, ORB, and upright SURF.",
    category: 'Feature detection', tags: ["SURF", "Feature matching", "SIFT and ORB"], status: 'instructions-ready',
    liveUrl: 'https://v-exor.github.io/drift/', reportUrl: 'reports/activity-04-instructions.docx', embed: false,
    objectives: ["Detect and visualize SURF keypoints and descriptors with OpenCV.", "Match SURF descriptors between two images and inspect the effect of the Hessian threshold.", "Compare SURF with SIFT and ORB and explore upright SURF orientation behavior."],
    input: "Image pairs and settings for the Hessian threshold, descriptor matching, and orientation tests.",
    output: "Keypoint and match visualizations, detector comparisons, and written answers to the three handout questions.",
    note: "The handout requires SURF feature matching, comparison with ORB and SIFT, and exploration of upright SURF. Runtime support must be stated accurately.",
    procedure: "Load grayscale images, compute SURF keypoints and descriptors, draw the detected features, and match an image pair. Compare detectors and orientation modes, then explain the observed differences.",
  },
  {
    id: '05', title: 'PCA in Computer Vision', subtitle: 'Less data. More understanding.', icon: 'pca',
    description: "Use PCA and eigenfaces to reduce facial-image dimensions, inspect retained variance, reconstruct faces, and perform SVM recognition.",
    category: 'Machine learning', tags: ["PCA", "Eigenfaces", "SVM recognition"], status: 'instructions-ready',
    liveUrl: 'https://v-exor.github.io/ember/', reportUrl: 'reports/activity-05-instructions.docx', embed: false,
    objectives: ["Load, flatten, and preprocess high-dimensional face-image data.", "Fit PCA and relate the number of components to cumulative explained variance and reconstruction.", "Visualize eigenfaces and classify faces using SVM on PCA projections."],
    input: "A labeled face-image dataset, a training/testing split, and PCA component and classifier settings.",
    output: "Eigenfaces, explained-variance and reconstruction comparisons, classification metrics, and a written report.",
    note: "The handout contains four tasks for preprocessing, PCA, eigenface visualization, and face recognition, plus report questions on the results.",
    procedure: "Prepare the face dataset and a separate test split, fit PCA on training data, inspect variance and eigenfaces, and compare reconstructions. Train and evaluate an SVM using reduced-dimensionality projections.",
  },
  {
    id: '06', title: "YOLOv11 Object Detection", subtitle: 'Give every object a name.', icon: 'detection',
    description: "Use pretrained YOLOv11 detection, prepare an annotated dataset, train a custom detector, and evaluate its predictions.",
    category: 'Machine learning', tags: ["YOLOv11", "Object detection", "Dataset annotation"], status: 'instructions-ready',
    liveUrl: 'https://v-exor.github.io/flint/', reportUrl: 'reports/activity-06-instructions.docx', embed: false,
    objectives: ["Run object detection with a pretrained YOLOv11 model.", "Prepare and annotate a custom dataset using normalized YOLO labels and separate dataset partitions.", "Train a custom detector and interpret its validation and test metrics."],
    input: "Images, video or camera frames, YOLO annotations, and pretrained or custom model weights.",
    output: "Bounding-box predictions, prepared annotations, training history, and detection evaluation metrics.",
    note: "The document filename says YOLOV8, but its topic and instructions specify YOLOv11. The handout gives a 100-epoch example; the independent website documents its actual recorded 10-epoch run.",
    procedure: "Run pretrained detection, collect and label custom images, organize the dataset, train the detector, and evaluate saved weights on held-out data. Review precision, recall, and prediction examples without treating recorded training as live browser execution.",
  },
  {
    id: '07', title: 'Segmentation Technique', subtitle: "Separate the regions. Understand the scene.", icon: 'upcoming',
    description: "Compare thresholding, region-based, edge-based, and semantic segmentation to understand how images are divided into meaningful regions.",
    category: "Image processing", tags: ["Thresholding", "Region and edge methods", "Semantic segmentation"], status: 'instructions-ready',
    liveUrl: 'https://v-exor.github.io/grove/', reportUrl: 'reports/activity-07-instructions.docx', embed: false,
    objectives: ["Apply global and adaptive thresholds to grayscale images.", "Use region growing and watershed to form and separate connected regions.", "Compare edge-guided segmentation with region-based boundaries.", "Apply a pretrained semantic model and evaluate overlap when ground-truth masks are available."], input: "Grayscale images, touching-object samples, natural scenes, seed points, and optional annotated segmentation masks.", output: "Threshold masks, grown and separated regions, edge-guided masks, semantic labels, and qualitative or IoU comparisons.",
    note: "The handout covers four segmentation approaches and asks for an advantage and limitation of each. Quantitative overlap comparisons require compatible ground-truth masks.",
    procedure: "Compare global and adaptive thresholds, explore region growing and watershed, detect and fill contours, then run pretrained semantic segmentation. Discuss use cases, limitations, and computation, and calculate IoU when annotations are available.",
  },
]

export const categories = ['All activities', 'Image processing', 'Feature detection', 'Machine learning'] as const
export const statusLabels: Record<LabStatus, string> = {
  'instructions-ready': 'Instructions available',
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
