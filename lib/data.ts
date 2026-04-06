import { Prompt } from './types';

export const MOCK_PROMPTS: Prompt[] = [
  {
    id: '1',
    title: 'The Ultimate Code Review Assistant',
    description:
      'Transform your code reviews with AI-powered feedback. Get detailed analysis of code quality, performance issues, security vulnerabilities, and best practices.',
    fullPrompt: `You are an expert senior software engineer conducting a thorough code review. Analyze the following code and provide:

1. **Code Quality Assessment**: Rate the overall code quality (1-10) with justification
2. **Issues Found**: List all bugs, anti-patterns, and code smells
3. **Security Vulnerabilities**: Identify any security risks
4. **Performance Optimization**: Suggest performance improvements
5. **Best Practices**: Point out deviations from industry standards
6. **Positive Highlights**: Mention what was done well
7. **Refactoring Suggestions**: Provide specific refactored code snippets

Format your response with clear sections and use markdown. Be constructive, specific, and educational.

Code to review:
[PASTE YOUR CODE HERE]`,
    image: 'https://picsum.photos/seed/codereview42/640/360',
    tags: ['Coding', 'Productivity'],
    author: { name: 'Alex Chen', avatar: 'https://i.pravatar.cc/40?img=11' },
    likes: 2847,
    views: 18420,
    copies: 4231,
    createdAt: '2024-03-15',
    trending: true,
  },
  {
    id: '2',
    title: 'Creative Story Generator',
    description:
      'Craft compelling narratives with rich characters and vivid world-building. Perfect for writers seeking inspiration and structure for any genre.',
    fullPrompt: `You are a master storyteller with expertise in narrative structure, character development, and world-building. Create an original short story based on these parameters:

**Story Parameters:**
- Genre: [SPECIFY GENRE]
- Tone: [e.g., dark, whimsical, suspenseful]
- Main Character: [Brief description]
- Setting: [Time and place]
- Central Conflict: [What drives the story]
- Theme: [Core message or idea]
- Length: [Word count target]

**Structure to follow:**
1. Opening hook (first sentence grabs attention)
2. Establish character and setting
3. Introduce the conflict
4. Rising action with complications
5. Climax
6. Resolution that reflects the theme

Make the story emotionally resonant, with vivid sensory details and authentic dialogue. Every scene should either advance the plot or reveal character.`,
    image: 'https://picsum.photos/seed/storyteller88/640/360',
    tags: ['Creative', 'Writing'],
    author: { name: 'Maya Patel', avatar: 'https://i.pravatar.cc/40?img=5' },
    likes: 1923,
    views: 12550,
    copies: 3108,
    createdAt: '2024-03-20',
    trending: true,
  },
  {
    id: '3',
    title: 'SEO Content Optimizer Pro',
    description:
      'Optimize any piece of content for search engines without sacrificing readability. Boost rankings with strategic keyword placement and semantic relevance.',
    fullPrompt: `You are an expert SEO strategist and content writer. Optimize the following content for search engines while maintaining natural readability and value for human readers.

**Target Information:**
- Primary Keyword: [MAIN KEYWORD]
- Secondary Keywords: [KEYWORD 1, KEYWORD 2, KEYWORD 3]
- Target Audience: [WHO IS THIS FOR]
- Content Type: [Blog post / Landing page / Product description]
- Word Count Target: [NUMBER]

**Optimization Tasks:**
1. Craft an SEO-optimized title (50-60 chars) with primary keyword
2. Write a compelling meta description (150-160 chars)
3. Suggest H1, H2, H3 header structure with keywords
4. Optimize the opening paragraph with primary keyword in first 100 words
5. Add semantic keywords and LSI terms naturally throughout
6. Suggest internal and external link opportunities
7. Add FAQ section targeting featured snippet opportunities
8. Review and improve content for E-E-A-T signals

Original content to optimize:
[PASTE CONTENT HERE]`,
    image: 'https://picsum.photos/seed/seoopt77/640/360',
    tags: ['SEO', 'Marketing'],
    author: { name: 'Sarah Kim', avatar: 'https://i.pravatar.cc/40?img=9' },
    likes: 1456,
    views: 9820,
    copies: 2654,
    createdAt: '2024-03-22',
    trending: true,
  },
  {
    id: '4',
    title: 'UI/UX Design Brief Creator',
    description:
      'Generate comprehensive design briefs that align stakeholders and give designers everything they need. Includes user personas, flows, and success metrics.',
    fullPrompt: `You are a senior UX strategist and product designer. Create a comprehensive design brief for the following project that will align all stakeholders and give the design team everything they need.

**Project Information:**
- Product/Feature Name: [NAME]
- Type: [Web app / Mobile app / Dashboard / Landing page]
- Business Goal: [What this should achieve]
- Target Users: [Who will use this]
- Key Problem: [What problem are we solving]
- Success Metrics: [How we'll measure success]

**Deliverable: Complete Design Brief including:**

1. **Executive Summary** (2-3 sentences)
2. **User Personas** (2-3 detailed personas with goals, pain points, tech comfort)
3. **User Journey Map** (key touchpoints and emotions)
4. **Information Architecture** (sitemap / screen flow)
5. **UI Requirements** (must-have components and interactions)
6. **Accessibility Requirements** (WCAG compliance level, key considerations)
7. **Technical Constraints** (platform, browsers, performance targets)
8. **Design Inspiration** (3-5 reference examples with reasoning)
9. **Timeline & Milestones**
10. **Open Questions** (things to clarify before starting)`,
    image: 'https://picsum.photos/seed/uxdesign55/640/360',
    tags: ['Design', 'Productivity'],
    author: { name: 'James Liu', avatar: 'https://i.pravatar.cc/40?img=3' },
    likes: 1102,
    views: 7340,
    copies: 1876,
    createdAt: '2024-03-25',
    trending: false,
  },
  {
    id: '5',
    title: 'Business Email Drafting Pro',
    description:
      'Write polished, professional business emails for any situation. From difficult conversations to partnership proposals, always strike the right tone.',
    fullPrompt: `You are an expert business communication specialist. Draft a professional email based on the following context:

**Email Context:**
- Purpose: [e.g., follow-up, proposal, complaint, negotiation, introduction]
- From: [Your role/title]
- To: [Recipient role/title and relationship to you]
- Key Message: [Main point to communicate]
- Desired Outcome: [What you want to happen after they read this]
- Tone: [Formal / Semi-formal / Friendly professional]
- Any sensitive points to handle carefully: [Optional]

**Draft Requirements:**
1. Subject line (compelling, specific, max 60 chars)
2. Opening (personalized, not generic)
3. Body (clear, scannable with short paragraphs)
4. Value proposition or context
5. Specific ask or call-to-action
6. Professional closing
7. Signature block

Provide 2 versions: one concise (under 150 words) and one detailed (under 300 words). Then explain the strategic choices made.`,
    image: 'https://picsum.photos/seed/businessemail33/640/360',
    tags: ['Business', 'Writing'],
    author: { name: 'Rachel Torres', avatar: 'https://i.pravatar.cc/40?img=23' },
    likes: 987,
    views: 6120,
    copies: 1543,
    createdAt: '2024-03-28',
    trending: false,
  },
  {
    id: '6',
    title: 'Data Analysis Expert',
    description:
      'Turn raw data into actionable insights with structured analysis frameworks. Get statistical summaries, pattern detection, and visualization recommendations.',
    fullPrompt: `You are a senior data scientist and business intelligence expert. Perform a comprehensive analysis of the following dataset and provide actionable insights.

**Dataset Information:**
- Data Source: [Where data comes from]
- Time Period: [Date range]
- Key Variables: [List main columns/fields]
- Business Context: [Why this data matters]
- Analysis Goal: [What decisions will this inform]

**Analysis Framework:**

1. **Data Quality Assessment**
   - Missing values and how to handle them
   - Outliers and anomalies
   - Data integrity issues

2. **Descriptive Statistics**
   - Summary statistics for key variables
   - Distribution analysis
   - Correlation matrix highlights

3. **Trend Analysis**
   - Time-series patterns
   - Seasonal variations
   - Growth rates

4. **Key Insights**
   - Top 5 most important findings
   - Unexpected patterns
   - Actionable recommendations

5. **Visualization Recommendations**
   - Best chart types for each insight
   - Dashboard layout suggestions

6. **Next Steps**
   - Further analysis to consider
   - Data gaps to fill

Data:
[PASTE DATA OR DESCRIBE DATASET HERE]`,
    image: 'https://picsum.photos/seed/dataanalysis99/640/360',
    tags: ['Data', 'Research'],
    author: { name: 'Omar Hassan', avatar: 'https://i.pravatar.cc/40?img=15' },
    likes: 1634,
    views: 11200,
    copies: 2987,
    createdAt: '2024-04-01',
    trending: true,
  },
  {
    id: '7',
    title: 'Social Media Content Calendar',
    description:
      'Build a month-long content strategy with post ideas, captions, hashtags, and optimal posting times across all major platforms.',
    fullPrompt: `You are a social media strategist with expertise across all major platforms. Create a comprehensive 30-day content calendar for the following brand:

**Brand Information:**
- Brand/Company Name: [NAME]
- Industry: [INDUSTRY]
- Target Audience: [Demographics and interests]
- Brand Voice: [e.g., professional, playful, inspirational, educational]
- Primary Goal: [Awareness / Engagement / Leads / Sales]
- Platforms: [Instagram / Twitter-X / LinkedIn / TikTok / Facebook]
- Posting Frequency: [Posts per week per platform]

**Deliverable for each week (4 weeks):**
- Theme of the week
- 5-7 post ideas with:
  - Content type (image, video, carousel, reel, story)
  - Caption draft (platform-optimized)
  - Hashtag strategy (mix of broad/niche)
  - Best time to post
  - Engagement hook

**Additional:**
- 3 evergreen post templates to reuse
- Monthly campaign idea
- Metrics to track`,
    image: 'https://picsum.photos/seed/socialcalendar66/640/360',
    tags: ['Marketing', 'Productivity'],
    author: { name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/40?img=20' },
    likes: 1287,
    views: 8450,
    copies: 2234,
    createdAt: '2024-04-03',
    trending: false,
  },
  {
    id: '8',
    title: 'Python Code Debugger & Explainer',
    description:
      'Debug any Python code with detailed explanations of what went wrong and why. Includes fixed code, root cause analysis, and prevention tips.',
    fullPrompt: `You are an expert Python developer and debugging specialist. Analyze the following Python code, identify all issues, and provide a comprehensive debugging report.

**Debugging Analysis:**

1. **Error Diagnosis**
   - Identify the exact error(s) and their type
   - Explain what went wrong in plain English
   - Show the line(s) causing the issue

2. **Root Cause Analysis**
   - Why did this error occur?
   - What assumption was incorrect?

3. **Fixed Code**
   - Provide the corrected code
   - Highlight all changes made with inline comments
   - Explain each fix

4. **Code Improvements** (beyond just fixing the bug)
   - Better Python idioms to use
   - Performance improvements
   - Type hints to add
   - Edge cases to handle

5. **Prevention Tips**
   - How to avoid this type of bug in the future
   - Useful debugging techniques for similar issues
   - Recommended tools or libraries

6. **Test Cases**
   - Write 3-5 test cases to verify the fix works

Code to debug:
\`\`\`python
[PASTE YOUR CODE HERE]
\`\`\`

Error message (if any):
[PASTE ERROR MESSAGE HERE]`,
    image: 'https://picsum.photos/seed/pythondebug44/640/360',
    tags: ['Coding'],
    author: { name: 'David Park', avatar: 'https://i.pravatar.cc/40?img=7' },
    likes: 2156,
    views: 14780,
    copies: 3654,
    createdAt: '2024-04-05',
    trending: true,
  },
  {
    id: '9',
    title: 'Brand Identity Storyteller',
    description:
      'Build a magnetic brand identity from scratch. Define your voice, values, positioning, and create a compelling origin story that resonates.',
    fullPrompt: `You are a world-class brand strategist who has worked with Fortune 500 companies and viral startups. Help build a compelling brand identity for the following business:

**Business Information:**
- Business Name: [NAME]
- Industry/Category: [INDUSTRY]
- Products/Services: [WHAT YOU SELL]
- Founded: [WHEN / BY WHOM]
- Current Stage: [Startup / Growth / Established]
- Competitors: [2-3 main competitors]
- What makes you different: [YOUR UNFAIR ADVANTAGE]

**Brand Identity Framework:**

1. **Brand Purpose & Mission**
   - Why do you exist beyond making money?
   - Mission statement (one compelling sentence)
   - Vision statement (where you're going)

2. **Brand Values** (3-5 core values with descriptions)

3. **Target Audience Deep Dive**
   - Primary persona (detailed profile)
   - Their aspirations and fears
   - What they want from a brand like yours

4. **Brand Personality**
   - If your brand were a person, describe them
   - Tone of voice guidelines (with examples)
   - Words to use / words to avoid

5. **Brand Positioning Statement**
   - The classic [For X who Y, our brand is Z that W] format

6. **Origin Story**
   - Compelling narrative about how/why the brand started
   - The "aha moment" or problem you noticed
   - Emotional hook

7. **Tagline Options** (5 options with reasoning)`,
    image: 'https://picsum.photos/seed/brandidentity22/640/360',
    tags: ['Creative', 'Business', 'Design'],
    author: { name: 'Lisa Wong', avatar: 'https://i.pravatar.cc/40?img=18' },
    likes: 891,
    views: 5670,
    copies: 1234,
    createdAt: '2024-04-07',
    trending: false,
  },
  {
    id: '10',
    title: 'Academic Research Assistant',
    description:
      'Structure and accelerate your academic research with systematic literature review, hypothesis formation, methodology design, and citation management.',
    fullPrompt: `You are a PhD-level academic research consultant with expertise across multiple disciplines. Help structure and execute the following research project:

**Research Context:**
- Topic/Subject: [YOUR RESEARCH TOPIC]
- Discipline: [FIELD OF STUDY]
- Research Level: [Undergraduate / Graduate / PhD / Professional]
- Purpose: [Thesis / Paper / Literature Review / Grant Proposal]
- Word Count: [TARGET LENGTH]
- Deadline: [TIMEFRAME]

**Research Support Services:**

1. **Research Question Refinement**
   - Evaluate and sharpen your research question
   - Suggest sub-questions to explore
   - Identify scope and limitations

2. **Literature Review Framework**
   - Key themes to cover
   - Seminal works to include
   - Search strategy and keywords
   - How to synthesize sources (not just summarize)

3. **Methodology Recommendation**
   - Qualitative vs quantitative approach
   - Data collection methods
   - Analysis framework

4. **Argument Structure**
   - Thesis statement
   - Supporting arguments (3-5 main points)
   - Anticipated counterarguments and rebuttals

5. **Academic Writing Style**
   - Rewrite samples in proper academic tone
   - Transition phrases for scholarly writing
   - Citation format guidance

6. **Abstract Draft**
   - 250-word structured abstract

Current draft or notes:
[PASTE YOUR DRAFT OR KEY POINTS HERE]`,
    image: 'https://picsum.photos/seed/research101/640/360',
    tags: ['Research', 'Education', 'Writing'],
    author: { name: 'Dr. Emma Clarke', avatar: 'https://i.pravatar.cc/40?img=25' },
    likes: 743,
    views: 4890,
    copies: 987,
    createdAt: '2024-04-09',
    trending: false,
  },
  {
    id: '11',
    title: 'Product Launch Strategy Planner',
    description:
      'Plan a full go-to-market strategy for your product launch. Covers positioning, messaging, launch timeline, PR, and growth channels.',
    fullPrompt: `You are a seasoned product marketing director who has launched 50+ products across B2B and B2C markets. Create a comprehensive launch strategy for the following product:

**Product Information:**
- Product Name: [NAME]
- Category: [WHAT TYPE OF PRODUCT]
- Target Market: [WHO BUYS IT]
- Price Point: [PRICING STRATEGY]
- Launch Date: [WHEN]
- Budget: [MARKETING BUDGET]
- Team Size: [HOW MANY PEOPLE]
- Unique Value Proposition: [WHY PEOPLE SHOULD BUY]

**Launch Strategy Deliverables:**

1. **Market Analysis**
   - Competitive landscape
   - Market timing assessment
   - Target segment prioritization

2. **Messaging Framework**
   - Core value prop (elevator pitch)
   - Messaging pillars (3 key messages)
   - Tagline options
   - Copy for different audiences

3. **Launch Timeline** (12-week plan)
   - Pre-launch (weeks 1-4): Build anticipation
   - Launch week activities
   - Post-launch (weeks 6-12): Sustain momentum

4. **Channel Strategy**
   - Organic channels (content, SEO, social)
   - Paid channels with budget allocation
   - PR and media outreach plan
   - Partnership opportunities

5. **Launch Day Checklist**

6. **Success Metrics & KPIs**
   - Week 1, Month 1, Quarter 1 targets

7. **Risk Mitigation Plan**`,
    image: 'https://picsum.photos/seed/productlaunch/640/360',
    tags: ['Business', 'Marketing'],
    author: { name: 'Marcus Johnson', avatar: 'https://i.pravatar.cc/40?img=12' },
    likes: 1567,
    views: 10230,
    copies: 2876,
    createdAt: '2024-04-10',
    trending: true,
  },
  {
    id: '12',
    title: 'AI Art Prompt Crafter',
    description:
      'Generate stunning AI art prompts for Midjourney, DALL-E, and Stable Diffusion. Includes style modifiers, lighting, composition, and camera settings.',
    fullPrompt: `You are a professional AI art director with deep expertise in prompt engineering for Midjourney v6, DALL-E 3, Stable Diffusion XL, and other image generation models.

**Art Direction Request:**
- Subject: [WHAT YOU WANT TO CREATE]
- Mood/Feeling: [EMOTIONAL TONE]
- Style Reference: [Artist / Art movement / Era]
- Color Palette: [Dominant colors or mood]
- Use Case: [Personal / Commercial / Social media / Print]
- Model Target: [Midjourney / DALL-E 3 / Stable Diffusion]

**Generate the following:**

1. **Primary Prompt** (for your specified model)
   - Detailed subject description
   - Art style and medium
   - Lighting and atmosphere
   - Composition and perspective
   - Color grading
   - Quality modifiers

2. **3 Variations**
   - Photorealistic version
   - Artistic/stylized version
   - Minimalist/abstract version

3. **Negative Prompt** (things to avoid)

4. **Technical Parameters**
   - Aspect ratio recommendation
   - Style reference weights
   - CFG scale suggestions
   - Model-specific tips

5. **Iteration Tips**
   - 3 ways to improve if first result isn't right

Subject to create:
[DESCRIBE WHAT YOU WANT]`,
    image: 'https://picsum.photos/seed/aiartprompt/640/360',
    tags: ['AI Art', 'Creative'],
    author: { name: 'Nina Rossi', avatar: 'https://i.pravatar.cc/40?img=6' },
    likes: 2341,
    views: 15670,
    copies: 4102,
    createdAt: '2024-04-12',
    trending: true,
  },
  {
    id: '13',
    title: 'Technical Documentation Writer',
    description:
      'Create clear, comprehensive technical documentation from messy codebases. Auto-generates README files, API docs, and developer guides.',
    fullPrompt: `You are a technical writer with 10+ years of experience documenting complex software systems. Create professional documentation for the following:

**Documentation Request:**
- Project/API Name: [NAME]
- Type: [README / API Docs / Developer Guide / User Manual / Architecture Doc]
- Audience: [Junior devs / Senior devs / Non-technical users / Mixed]
- Tech Stack: [LANGUAGES AND FRAMEWORKS]
- Current State: [What exists, what's missing]

**Documentation Structure:**

1. **README.md** (if applicable)
   - Project overview with badges
   - Features list (with screenshots placeholders)
   - Quick start (get running in < 5 minutes)
   - Installation with prerequisites
   - Configuration reference
   - Usage examples
   - Contributing guidelines
   - License

2. **API Reference** (if applicable)
   - Authentication overview
   - Base URL and versioning
   - For each endpoint:
     - Method + path
     - Description
     - Request parameters (query, body, headers)
     - Response schema
     - Error codes
     - Code examples (curl + JavaScript + Python)

3. **Architecture Overview**
   - System diagram description
   - Component relationships
   - Data flow explanation

Code/System to document:
[PASTE CODE OR DESCRIBE YOUR SYSTEM]`,
    image: 'https://picsum.photos/seed/techdocs55/640/360',
    tags: ['Coding', 'Writing'],
    author: { name: 'Tom Bradley', avatar: 'https://i.pravatar.cc/40?img=8' },
    likes: 678,
    views: 4120,
    copies: 876,
    createdAt: '2024-04-14',
    trending: false,
  },
  {
    id: '14',
    title: 'Customer Persona Builder',
    description:
      'Build data-driven customer personas that your entire team will actually use. Includes demographic, psychographic, and behavioral profiles.',
    fullPrompt: `You are a market research specialist and UX strategist. Build detailed, actionable customer personas based on the following information:

**Business Context:**
- Company/Product: [NAME]
- Industry: [INDUSTRY]
- Current Customers (if any): [DESCRIBE WHO BUYS FROM YOU]
- Problem You Solve: [CORE VALUE PROPOSITION]
- Data Available: [Surveys / Analytics / Interviews / Assumptions]

**Persona Development Framework:**

For each persona (create 3), provide:

**[PERSONA NAME] - The [ARCHETYPE]**

1. **Demographics**
   - Age range, gender, location
   - Education and occupation
   - Income level
   - Family situation

2. **Psychographics**
   - Values and beliefs
   - Lifestyle and interests
   - Personality traits
   - Aspirations and goals

3. **Behavioral Profile**
   - How they discover products
   - Decision-making process
   - Price sensitivity
   - Brand loyalty patterns
   - Digital behavior

4. **Pain Points & Frustrations**
   - Top 3 problems they face daily
   - What keeps them up at night
   - Current solutions they use (and hate)

5. **Goals & Motivations**
   - What they want to achieve
   - What success looks like for them

6. **Buying Triggers**
   - What pushes them to buy
   - Objections to overcome

7. **Marketing Implications**
   - Best channels to reach them
   - Message that resonates
   - Content they consume`,
    image: 'https://picsum.photos/seed/customerpersona/640/360',
    tags: ['Business', 'Marketing', 'Research'],
    author: { name: 'Anna Kowalski', avatar: 'https://i.pravatar.cc/40?img=21' },
    likes: 934,
    views: 6340,
    copies: 1432,
    createdAt: '2024-04-15',
    trending: false,
  },
  {
    id: '15',
    title: 'Startup Pitch Deck Writer',
    description:
      'Craft a compelling investor pitch deck narrative. Structure your story from problem to traction with the framework top VCs actually want to see.',
    fullPrompt: `You are a venture capital advisor and pitch coach who has helped 200+ startups raise over $500M combined. Create a compelling pitch deck narrative for the following startup:

**Startup Information:**
- Company Name: [NAME]
- Industry: [SECTOR]
- Stage: [Pre-seed / Seed / Series A]
- Funding Target: [$AMOUNT]
- Use of Funds: [WHAT YOU'LL DO WITH IT]
- Current Traction: [METRICS, REVENUE, USERS]
- Team: [KEY FOUNDERS AND BACKGROUND]

**Pitch Deck Narrative (12 slides):**

**Slide 1: Cover**
- Company name, tagline, and contact

**Slide 2: Problem**
- The painful problem you're solving
- How big is this problem? (with data)
- Who suffers from it?

**Slide 3: Solution**
- Your elegant solution
- The "aha moment" explanation
- Why now is the right time

**Slide 4: Product**
- Key features and how it works
- Demo flow description
- Technical moat (if applicable)

**Slide 5: Market Size**
- TAM, SAM, SOM breakdown
- Market growth rate
- Why this market, why now

**Slide 6: Business Model**
- How you make money
- Unit economics (CAC, LTV)
- Revenue streams

**Slide 7: Traction**
- Key metrics and milestones
- Growth chart talking points
- Notable customers/partnerships

**Slide 8: Go-to-Market**
- Customer acquisition strategy
- Channel breakdown
- Growth playbook

**Slide 9: Competition**
- Competitive landscape
- Your differentiated position
- Why you'll win

**Slide 10: Team**
- Why this team wins
- Relevant experience and domain expertise
- Advisors

**Slide 11: Financials**
- 3-year projections
- Key assumptions
- Path to profitability

**Slide 12: Ask**
- Funding amount and terms
- Use of funds breakdown
- Milestones this funding achieves

For each slide, provide: talking points, data to include, and what to avoid.`,
    image: 'https://picsum.photos/seed/pitchdeck77/640/360',
    tags: ['Business'],
    author: { name: 'Chris Evans', avatar: 'https://i.pravatar.cc/40?img=14' },
    likes: 1876,
    views: 12100,
    copies: 3341,
    createdAt: '2024-04-16',
    trending: true,
  },
  {
    id: '16',
    title: 'Mindful Learning Path Creator',
    description:
      'Design a personalized learning curriculum for any skill. Includes resources, milestones, projects, and a daily practice schedule.',
    fullPrompt: `You are an expert learning designer and educational psychologist. Create a personalized, structured learning path for the following goal:

**Learning Goal:**
- Skill to Learn: [WHAT YOU WANT TO LEARN]
- Current Level: [Beginner / Intermediate / Advanced]
- Time Available: [Hours per week]
- Timeline Goal: [When you want to achieve this]
- Learning Style: [Visual / Auditory / Reading / Hands-on]
- Budget: [Free only / Up to $X]
- Why This Skill: [Your motivation and use case]

**Personalized Learning Curriculum:**

1. **Skill Breakdown**
   - Core competencies to develop
   - Nice-to-have vs. must-have skills
   - Common pitfalls to avoid

2. **Phase 1: Foundation** (Weeks 1-4)
   - Key concepts to master
   - Recommended resources (free + paid)
   - Daily practice exercises
   - End-of-phase project

3. **Phase 2: Building** (Weeks 5-10)
   - Intermediate concepts
   - Project-based learning ideas
   - Communities and mentors to seek
   - End-of-phase project

4. **Phase 3: Mastery** (Weeks 11-16)
   - Advanced topics
   - Portfolio-worthy projects
   - How to demonstrate this skill professionally

5. **Daily Practice Schedule**
   - 30-min, 1-hour, and 2-hour daily routines
   - Habit-stacking suggestions

6. **Progress Milestones**
   - Weekly mini-goals
   - How to measure improvement
   - When you're ready to move forward

7. **Resources List**
   - Books, courses, YouTube channels, communities`,
    image: 'https://picsum.photos/seed/learningpath/640/360',
    tags: ['Education', 'Productivity'],
    author: { name: 'Sofia Martinez', avatar: 'https://i.pravatar.cc/40?img=19' },
    likes: 1123,
    views: 7890,
    copies: 1987,
    createdAt: '2024-04-17',
    trending: false,
  },
];

export const TRENDING_PROMPTS = MOCK_PROMPTS.filter((p) => p.trending);
