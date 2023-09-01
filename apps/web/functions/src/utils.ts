import axios from 'axios';
import { randomUUID } from 'crypto';
import { tmpdir } from 'os';

const fs = require('fs');
async function enviarImagen(urlImagen: string, urlDestino: string): Promise<void> {
  try {
    console.log("Getting image from url", urlImagen, "hacia", urlDestino)
    const response = await axios.get(urlImagen, { responseType: 'arraybuffer' });
    const imagenBuffer = Buffer.from(response.data, 'binary');
    console.log(imagenBuffer)
    // Guardar la imagen como archivo local
    const fileName = tmpdir() + "/" + randomUUID() + '.jpg';
    await fs.writeFileSync(fileName, imagenBuffer);

    // Crear el formulario multipart
    const { exec } = require('child_process');

    // Nombre de archivo como variable


    // Comando curl con la variable inyectada
    const curlCommand = `curl --location --request POST '${urlDestino}' \
    --header 'X-Spree-Token: 8b9c307dd89928cc60e8e59d2233dbafc7618f26c52fa5d3' \
    --header 'Cookie: __profilin=p%3Dt' \
    --form "image[attachment]=@\\"${fileName}\\""`;

    // Ejecutar el comando curl con la variable inyectada
    exec(curlCommand, (error:any, stdout:any, stderr:any) => {
    if (error) {
        console.error(`Error al ejecutar el comando curl: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Error en la salida estándar del comando curl: ${stderr}`);
        return;
    }
    console.log(`Salida del comando curl: ${stdout}`);
    })
    } catch (error) {
        console.error(`Error al descargar la imagen: ${error}`);
    }
}

export async function AttachSpreeImgFromExternalUrl(productSlug:string, imageUrl:string) {
    await enviarImagen(imageUrl, 'https://lomi.cl/api/v1/products/'+productSlug+'/images')
}

