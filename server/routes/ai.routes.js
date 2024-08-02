import express from "express";
import axios from "axios";

const router = express.Router();

router.route("/").get((_req, res) => {
    res.status(200).json({ message: "Hello from DALL.E Routes"});
})

router.post("/", async (req, res) => {
    const { prompt } = req.body;

    const options = {
        method: 'POST',
        url: 'https://imageai-generator.p.rapidapi.com/image',
        headers: {
            'x-rapidapi-key': 'e06cdfd3d6msh2d7b35a0e087920p11a9e8jsnf54c894f8f01',
            'x-rapidapi-host': 'imageai-generator.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            prompt: prompt,
            width: 512,
            height: 512,
            hr_scale: 1
        }
    };

    try {
        const response = await axios.request(options);
        const image = response.data;

        res.json({ photo: image });
        console.log(image); // Fixed the reference error by logging the image instead of imageUrl
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
});

export default router;





// import express from "express";
// import axios from "axios";

// const router = express.Router();

// router.route("/").get((req, res) => {
//     res.status(200).json({ message: "Hello from DALL.E Routes"});
// })

// router.post("/", async (req, res) => {
//     const { prompt } = req.body;

//     const options = {
//         method: 'POST',
//         url: 'https://ai-text-to-image-generator-api.p.rapidapi.com/realistic',
//         headers: {
//             'content-type': 'application/json',
//             'X-RapidAPI-Key': process.env.RAPID_API_KEY,
//             'X-RapidAPI-Host': 'ai-text-to-image-generator-api.p.rapidapi.com'
//         },
//         data: {
//             inputs: prompt,
//         }
//     };

//     try {
//         const response = await axios.request(options);
//         const imageUrl = response.data.url;
//         const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
//         const image = Buffer.from(imageResponse.data, 'binary').toString('base64');

//         res.json({ photo: image });
//         console.log(imageUrl);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Something went wrong!" });
//     }
// });

// export default router;