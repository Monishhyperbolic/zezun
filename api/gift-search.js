const catalog = [
  {id:'brass-diya',name:'Heritage Brass Diya Set',price:1499,tags:['brass','diya','traditional','festive'],occasions:['Festival','Religious Occasion','Housewarming','Wedding'],styles:['Traditional & Heritage','Decorative & Artistic']},
  {id:'ceramic-diffuser',name:'Mindful Ceramic Diffuser',price:899,tags:['ceramic','diffuser','mindful','home'],occasions:['Birthday','Housewarming','Appreciation & Thank You','Just Because'],styles:['Spiritual & Mindful','Decorative & Artistic','Unique & Unusual']},
  {id:'personalised-journal',name:'Personalised Keepsake Journal',price:499,tags:['journal','personalised','notebook'],occasions:['Birthday','Appreciation & Thank You','Just Because'],styles:['Personal & Meaningful','Unique & Unusual']},
  {id:'brass-bowl',name:'Singing Bowl Starter Set',price:2499,tags:['singing bowl','meditation','mindful'],occasions:['Birthday','Anniversary','Wedding','Religious Occasion'],styles:['Spiritual & Mindful','Traditional & Heritage']},
  {id:'desk-planter',name:'Artisan Desk Planter',price:349,tags:['plant','desk','thank you','office'],occasions:['Housewarming','Appreciation & Thank You','Just Because'],styles:['Decorative & Artistic','Personal & Meaningful','Unique & Unusual']},
  {id:'candle-trio',name:'Artisanal Candle Trio',price:699,tags:['candle','home','scented','decor'],occasions:['Birthday','Anniversary','Housewarming','Just Because'],styles:['Decorative & Artistic','Unique & Unusual','Gift Hampers & Collections']},
  {id:'incense-set',name:'Brass Incense Holder & Incense Set',price:399,tags:['brass','incense','spiritual','ritual'],occasions:['Festival','Religious Occasion','Housewarming','Appreciation & Thank You'],styles:['Traditional & Heritage','Spiritual & Mindful']},
  {id:'festive-hamper',name:'The Thoughtful Celebration Hamper',price:3299,tags:['hamper','gift box','celebration'],occasions:['Birthday','Anniversary','Wedding','Festival','Appreciation & Thank You'],styles:['Gift Hampers & Collections','Personal & Meaningful','Unique & Unusual']},
  {id:'silk-stole',name:'Handwoven Silk Stole',price:1899,tags:['silk','stole','fashion','handwoven'],occasions:['Birthday','Anniversary','Wedding','Appreciation & Thank You'],styles:['Traditional & Heritage','Personal & Meaningful']},
  {id:'coffee-gift-box',name:'Roaster’s Morning Gift Box',price:1299,tags:['coffee','breakfast','food','office'],occasions:['Birthday','Appreciation & Thank You','Just Because','Housewarming'],styles:['Gift Hampers & Collections','Unique & Unusual']},
  {id:'leather-travel-kit',name:'Leather Travel Companion',price:2799,tags:['leather','travel','organiser','premium'],occasions:['Birthday','Anniversary','Wedding','Appreciation & Thank You'],styles:['Traditional & Heritage','Personal & Meaningful','Unique & Unusual']},
  {id:'wellness-box',name:'Evening Ritual Wellness Box',price:2199,tags:['wellness','self care','relaxing','spa'],occasions:['Birthday','Anniversary','Appreciation & Thank You','Just Because'],styles:['Spiritual & Mindful','Gift Hampers & Collections']},
];

const json = (response, status, body) => {
  response.status(status).setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
};

module.exports = async (request, response) => {
  if (request.method !== 'POST') return json(response, 405, {error:'Method not allowed'});
  if (!process.env.OPENAI_API_KEY) return json(response, 503, {error:'Gift search is not configured'});

  const query = typeof request.body?.query === 'string' ? request.body.query.trim() : '';
  if (!query || query.length > 500) return json(response, 400, {error:'Enter a gift request up to 500 characters'});

  const prompt = [
    'Choose up to four products from this catalog for the customer request.',
    'Return only valid JSON in this exact shape: {"productIds":["id-one","id-two"]}.',
    'Never invent IDs. Prefer products that fit the recipient, occasion, style, and budget.',
    `Customer request: ${query}`,
    `Catalog: ${JSON.stringify(catalog)}`,
  ].join('\n');

  try {
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        temperature: 0.2,
        response_format: {type:'json_object'},
        messages: [
          {role:'system',content:'You are a precise gift shopping assistant. Follow the requested JSON format exactly.'},
          {role:'user',content:prompt},
        ],
      }),
    });

    if (!openaiResponse.ok) {
      console.error('OpenAI gift search failed:', openaiResponse.status);
      return json(response, 502, {error:'Gift search is temporarily unavailable'});
    }

    const completion = await openaiResponse.json();
    const content = completion.choices?.[0]?.message?.content;
    const parsed = JSON.parse(content);
    const validIds = new Set(catalog.map(product => product.id));
    const productIds = Array.isArray(parsed.productIds)
      ? parsed.productIds.filter(id => typeof id === 'string' && validIds.has(id)).slice(0, 4)
      : [];

    return json(response, 200, {productIds});
  } catch (error) {
    console.error('Gift search request failed:', error);
    return json(response, 502, {error:'Gift search is temporarily unavailable'});
  }
};
