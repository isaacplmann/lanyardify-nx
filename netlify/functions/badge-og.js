// Get the data for a given badge number and 
// generate an image for it with cloudinary

const { createClient } = require('@supabase/supabase-js');
const utf8 = require('utf8');
const fetch = require('node-fetch');

const {
  DATABASE_URL,
  SUPABASE_SERVICE_API_KEY
} = process.env;


const handler = async (event) => {
  
  // fs the badge data for this ticket
  const path = event.path.split("/og/badge/")[1];

  // Connect to database and fetch data
  const supabase = createClient(DATABASE_URL, SUPABASE_SERVICE_API_KEY);
  const { data } = await supabase
    .from('badgedata')
    .select('*')
    .eq('Path', path)
    .is('Banned', false);;

  // No custom badge on this URL? 
  // Display a generic OG image with a CTA to register
  if (!data.length) {
    console.log(`no badge found`);
    return;
  }

  let badgeData = data[0];
  const salutationText = encodeURI(`${badgeData.DisplayName.split(" ")[0]} will be lookin’ hella fly at Jamstack Conf this year!`);
  
  // /l_text:k8nika7k7bkdaxbzauw3.ttf_48_center:@MannIsaac,co_rgb:FFFFFF,y_-10,x_182,c_fit/v1649705462/badges/badge_bg.png
  // Fetch a generated image from Cloudinary
  const bgImageUrl = "v1649705462/badges/badge_bg.png";
  const nameLabel = `b_rgb:0B1A2D,bo_20px_solid_rgb:0B1A2D,r_5,l_text:k8nika7k7bkdaxbzauw3.ttf_64_center:${badgeData.DisplayName},co_rgb:FFFFFF,y_-140,x_182,c_fit`;
  const twitterLabel = `l_text:k8nika7k7bkdaxbzauw3.ttf_48_center:${badgeData.TwitterHandle},co_rgb:FFFFFF,y_-10,x_182,c_fit`;
  const ogUrl = `https://res.cloudinary.com/nx-conf-lite-2022/image/upload/c_scale,w_1200/${nameLabel}/${twitterLabel}/${bgImageUrl}`;

  let image;
  try {
    const result = await fetch(ogUrl);
    image = await result.buffer();
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    }
  }

  // return the image directly
  return {
    statusCode: 200,
    headers: {
      'Content-type': 'image/jpeg'
    },
    body: image.toString('base64'),
    isBase64Encoded: true
  }
  
};

exports.handler = handler;