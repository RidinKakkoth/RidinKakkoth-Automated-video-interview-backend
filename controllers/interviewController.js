require('dotenv').config();
const axios = require('axios');
const interviewModel=require('../models/interviewModel')
const fs=require('fs')
// import OpenAI from 'openai';
const  OpenAI  = require("openai");
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

const { exec } = require('child_process');
const path = require('path');
require('dotenv').config()



const addInterview=async(req,res)=>{
    
    try {
    // let image_filename=req.file.filename

    const{ title, experience, questions}=req.body

    const interview=new interviewModel({
        title, experience, questions
        // ,image:image_filename
    })

        await interview.save()
        res.json({success:true,message:"Interview Added"})
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false,message:"Error"})
    }

}

//all interview list

const fetchInterviews=async(req,res)=>{

   try {
    const interviews=await interviewModel.find({})

    res.json({success:true,data:interviews})

   } catch (error) {
        console.error(error)
        res.status(500).json({success:false,message:"Error"})
   }
}

//fetch single interview

const singleInterviewData=async(req,res)=>{
    try {
        const interview = await interviewModel.findById(req.params.id);
        if (!interview) {
          return res.status(404).json({ success: false, message: 'Interview not found' });
        }
        res.json({ success: true, data: interview });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
}
// ==========================================================================================================================================================================================
// ffmpeg.setFfmpegPath(ffmpegInstaller.path);
// // Function to transcribe video to audio using ffmpeg
// const transcribeVideo = (videoPath) => {
//   return new Promise((resolve, reject) => {

//     const audioWavPath = videoPath.replace(path.extname(videoPath), '.wav');
//     const audioMp3Path = videoPath.replace(path.extname(videoPath), '.mp3');

//     const command = `"${ffmpegInstaller.path}" -i "${videoPath}" -vn -acodec pcm_s16le -ar 44100 -ac 2 "${audioWavPath}"`;

//     // const audioPath = videoPath.replace(path.extname(videoPath), '.wav');
//     // const command = `"${ffmpeg.path}" -i "${videoPath}" -vn -acodec pcm_s16le -ar 44100 -ac 2 "${audioPath}"`;

//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         console.error(`Error transcribing video: ${error.message}`);
//         reject(error);
//       } else {
//         console.log('Video transcribed to audio:', audioWavPath);
//         // console.log('Video transcribed to audio:', audioPath);
//         // resolve(audioPath);

//         // Convert the WAV file to MP3
//         ffmpeg(audioWavPath)
//           .toFormat('mp3')
//           .on('end', () => {
//             console.log('Audio converted to MP3:', audioMp3Path);
//             resolve(audioMp3Path);
//           })
//           .on('error', (err) => {
//             console.error('Error converting to MP3:', err.message);
//             reject(err);
//           })
//           .save(audioMp3Path);


//       }
//     });


//   });
// };

// //========================================================


// const apiKey= process.env.OPENAI_API_KEY
// // Function to evaluate answer using OpenAI

// const evaluateAnswer = async ( audio, apiKey) => {

//     // const audioPath = path.join(__dirname,audio);
//     // const audioPath = path.resolve(__dirname, '..', audio);
//     const audioPath = audio
//     console.log(audioPath,"aaaapppppp",apiKey);

//     const transcribeAudio = async (filename, apiKey) => {
//         try {
            
//             // const openai = new OpenAIApi.OpenAI({ apiKey})

//             const openai = new OpenAI.OpenAI({ apiKey});
//             const transcription = await openai.audio.transcriptions.create({
//               file: fs.createReadStream(audioPath),
//               model: "whisper-1",
//             });

//             console.log(transcription.text);

//             // const transcription=await openai.audio.transcriptions.create({
//             //     files:fs.createReadStream(filename),
//             //     model:"whisper-1"
//             // })
//             // console.log(transcription,"tttttrrrrrrrr");

//             return (await transcription).text; // Assuming the response contains the transcribed text in 'data.text'
//         } catch (error) {
//             console.error("Error:", error);
//             throw error;
//         }
//     };

//     try {
//         const transcription = await transcribeAudio(audioPath, apiKey);
//         console.log("Transcription:", transcription);
//         return transcription;
//     } catch (error) {
//         console.error("Failed to transcribe audio:", error);
//     }
// };








// //==================================================================================
// // const evaluateAnswer = async (question, audioPath) => {


// //     async function transcribeAudio(filename,apiKey){


// //         try {

// //             const openAiClient=new openai({apiKey})

// //             const transcription=openAiClient.audio.transcriptions.create({
// //                 files:fs.createReadStream(filename),
// //                 model:"whisper-1"
// //             })

// //             return transcription
            
// //         } catch (error) {
// //             console.error("error",error)
// //         }
// //     }

// //     // (async()=>{
// //         const data=await transcribeAudio(audioPath,apiKey)
// //         return data
// //         console.log(data);
// //     // })()

// // }
//     // await transcribeAudioAndSaveToFile(audioPath, "newfile.txt");
//     // const audioContent = fs.createReadStream(audioPath);
//     // const file = await fs.readFile(Buffer.from(data), 'audio.mp3');
//     // const audioBuffer = Buffer.from(audioPath, 'base64');
// //  ======================================================================  
//     // const transcriptionResponse = await openai.audio.transcriptions.create({
//     //     model: "whisper-1",
//     //     file: files,
//     //     timeout: 600000 // Ensure the audio content is passed correctly
//     //   });
  
//     // const transcript = transcriptionResponse;

//     // console.log(question,"qqqq",transcript,"trrrrrrrr");
// //   ===================================================================

//  // Ensure OpenAI client is configured properly

// // async function transcribeAudioAndSaveToFile(audioPath, outputFilePath, retries = 3) {
// //   const audioContent = fs.createReadStream(audioPath);
// // //   console.log(audioContent, "Audio content stream created");

// //   for (let attempt = 1; attempt <= retries; attempt++) {
// //     try {
// //       const transcriptionResponse = await openai.audio.transcriptions.create({
// //         file: audioContent,
// //         model: "whisper-1",
// //         timeout: 60000 // Increase timeout to 60 seconds
// //       });
// //       console.log('Transcription:', transcriptionResponse.data.text,"=========================");

// //       const transcriptionText = transcriptionResponse.data.text;

// //       // Save the transcription text to a file
// //       await fs.writeFile(outputFilePath, transcriptionText);
// //       console.log(`Transcription saved to ${outputFilePath}`);

// //       return transcriptionResponse.data;
// //     } catch (error) {
// //       if (attempt === retries) {
// //         console.error('Max retries reached. Error during transcription:', error);
// //         throw error;
// //       }
// //       console.warn(`Attempt ${attempt} failed. Retrying...`, error);
// //     }
// //   }
// // }
// // ================================google
// // }





// // Example usage
// // transcribeAudioAndSaveToFile('uploads/video_1-1719171647196-83960497.wav', 'transcription.txt')
// //   .then(transcription => {
// //     console.log('Transcription completed and saved:', transcription);
// //   })
// //   .catch(error => {
// //     console.error('Error transcribing audio and saving to file:', error);
// //   });

// // }


// //     const evaluationResponse = await openai.chat.completions.create({
// //         model: "gpt-4",
// //         messages: [
// //           {
// //             role: "system",
// //             content: "You are an interviewer evaluating the following answer based on the given question.",
// //           },
// //           {
// //             role: "user",
// //             content: `Question: ${question}\nAnswer: ${transcript}`,
// //           }
// //         ]
// //       });
  
// //     return evaluationResponse.choices[0].message.content;
// //     // return evaluationResponse.data.choices[0].message.content;
// //   };










// =========================================================================================================================================================================================





const evaluateTranscription = async (question, transcription) => {



 

  // const evaluation = response.data;
  // console.log(evaluation,"======================================");
  // console.log(`Evaluation: ${JSON.stringify(evaluation, null, 2)}`,"========================");








// console.log(process.env.OPENAI_API_KEY,"keeeeeeeeeeeeee");


const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

  const prompt = `Evaluate the answer to the question.\n\nQuestion: ${question}\nAnswer: ${transcription}\n\nScore the answer on a scale from 0 to 100 based on its accuracy and completeness. Provide a brief justification for the score.`;

  try {
    // const response = await axios.post(
    //   'https://api.openai.com/v1/completions',
    //   {
    //     model: 'text-davinci-003',
    //     prompt: prompt,
    //     max_tokens: 150,
    //   },
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //     },
    //   }
    // );

const completion = await openai.completions.create({
  model: "gpt-3.5-turbo",
  prompt: prompt,
  max_tokens: 30,
});



    // const { choices } = response.data;
    // const evaluation = choices[0].text.trim();

    // // Extract score and feedback from the response (assuming the response format is consistent)
    // const scoreMatch = evaluation.match(/Score:\s*(\d+)/);
    // const feedbackMatch = evaluation.match(/Justification:\s*(.*)/);

    // const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;
    // const feedback = feedbackMatch ? feedbackMatch[1] : 'No feedback provided';

    // return { score, feedback };
  } catch (error) {
    console.error('Error evaluating transcription:', error);
    throw error;
  }
};









// =========================================================================================================================================================================================





// Handler for submitting interview data
const submitInterviewData = async (req, res) => {
  try {
    const interviewId = req.body.interviewId;
    const videoFiles = req.files;

    // Array to store evaluation results
    const evaluations = [];

    // Process each video file
    for (let index = 0; index < videoFiles.length; index++) {
      const file = videoFiles[index];
      const question = req.body[`question_${index + 1}`];
      const transcription = req.body[`transcription_${index + 1}`];
      const videoPath = file.path;

      // Evaluate the transcription
      const evaluation = await evaluateTranscription(question, transcription);
      evaluations.push({
        question,
        transcription,
        videoPath,
        ...evaluation,
      });
    }

    res.json({ success: true, data: { interviewId, evaluations } });
  } catch (error) {
    console.error("Error submitting interview data:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
  

//remove interview item

const removeinterview=async(req,res)=>{
    try {

        const interview_id=req.body.id  
        // use params
        // const interview_id=req.params.id


        const interview=await interviewModel.findById(interview_id)
        fs.unlink(`uploads/${interview.image}`,()=>{})

        await interviewModel.findByIdAndDelete(interview_id)


        res.json({ success: true, message: "interview item deleted" });
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


const updateListedStatus=async(req,res)=>{
    try {
        
         const interview_id=req.params.id

        const interview=await interviewModel.findById(interview_id)

        if (!interview) {
            return res.status(404).json({ success: false, message: 'interview item not found' });
          }

          interview.listed = !interview.listed;
          await interview.save();

          res.json({ success: true, message: 'interview listed status updated', listed: interview.listed });
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: 'Error updating interview listed status' });
        }
      };

module.exports={addInterview,fetchInterviews,singleInterviewData,submitInterviewData,removeinterview,updateListedStatus}