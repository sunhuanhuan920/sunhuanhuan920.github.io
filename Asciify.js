const canvas = document.getElementById("preview");
const fileInput = document.querySelector("input[type='file']");
const context = canvas.getContext("2d");
// Select the element in <pre> tag with id="asciiImage"
const asciiImage = document.querySelector("pre#asciiImage");

// Each ascii character correspond to a luminance level
const AsciiScale = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,\"^`'. ";

fileInput.onchange = (e) => {
  const file = e.target.files[0];

  // FileReader reads the file and loads it into the canvas
  const reader = new FileReader();
  reader.onload = (event) => {
    const image = new Image();
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      context.drawImage(image, 0, 0);
      convertToGreyScale(context, canvas.width, canvas.height);
      drawAsciiCharacter(convertToGreyScale(context,canvas.width, canvas.height), canvas.width);
    };
    image.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function rgbToLuminance(red, green, blue)
{
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function convertToGreyScale(context, width, height)
{
  const luminanceScaleImage = [];
  var imageData = context.getImageData(0, 0, width, height);

  // Extract the RGBA data from the image
  for(let i = 0; i < imageData.data.length; i+=4)
  {
    const red = imageData.data[i];
    const green = imageData.data[i + 1];
    const blue = imageData.data[i + 2];

    const luminanceScale = rgbToLuminance(red, green, blue);
    imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = luminanceScale;

    luminanceScaleImage.push(luminanceScale);
  }

  context.putImageData(imageData, 0, 0);

  // This Image contain only the luminance data
  // we will we use this Image to map to the Ascii character
  return luminanceScaleImage;
}

function asciifyPixel(luminanceScale)
{
  const AsciiScaleLength = AsciiScale.length;

  // map each pixel to an Ascii characeter
  // the luminance value is between 0(black) and 255(white)
  return AsciiScale[Math.ceil(((AsciiScaleLength - 1) * luminanceScale) / 255)];
}

function drawAsciiCharacter(luminanceScaleImage, width)
{
  // luminanceScale is the value of the current element in the array luminanceScaleImage
  asciiImage.textContent = luminanceScaleImage.reduce((asciiImage, luminanceScale, index) => {
    let nextCharacters = asciifyPixel(luminanceScale);
    
    //index is the array index of the current element
    if((index + 1) % width === 0)
    {
      nextCharacters += "\n";
    }

    return asciiImage + nextCharacters;
  }, "");
}