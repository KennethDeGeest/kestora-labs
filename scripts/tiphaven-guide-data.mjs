const DOL = { label: 'U.S. Department of Labor — Fact Sheet #15: Tipped employees', url: 'https://www.dol.gov/agencies/whd/fact-sheets/15-tipped-employees-flsa' };

export default [
  {
    slug:'average-bartender-salary-with-tips', title:'Average Bartender Salary With Tips — 2025 U.S. Wage Data', h1:'Average bartender salary with tips: use the median carefully',
    description:'See the latest U.S. bartender median wage including tips, learn what changes real earnings, and calculate your own hourly result after tip-out.',
    lead:'National wage data are a useful reference, but the shift, venue and tip-sharing setup determine what your own time pays.',
    french:'/fr/tiphaven/salaire-barman-avec-pourboires/',
    quickAnswer:{question:'What is the average bartender wage with tips?',answer:'The BLS reports a median bartender wage of $16.51 per hour in May 2025, including tips. The listed annual equivalent is $34,340, but part-time work and variable schedules are common.'},
    sections:[
      {id:'data',toc:'National data',title:'What the latest national data say',table:{headers:['Measure','May 2025 BLS figure'],rows:[['Median hourly wage','$16.51'],['Annual equivalent','$34,340'],['Included in wage figure','Tips']]},note:'A median is the midpoint: half of workers earned more and half earned less. It is not a forecast for a particular venue or schedule.'},
      {id:'range',toc:'Why the range is wide',title:'The national range is wide',paragraphs:['Bartender earnings vary across locations, industries, venue prices, scheduling, customer volume and tip-sharing rules. National figures combine many very different jobs.']},
      {id:'variables',toc:'What changes earnings',title:'What changes bartender earnings?',prompts:[['Shift','Weekend nights and slow weekday lunches can behave differently.'],['Venue','Menu prices, service model and customer volume affect tips.'],['Tip-out','Support-staff distributions reduce gross tips to net tips.'],['Hours','Opening, closing and side-work time change hourly earnings.'],['Wage','Direct wages and applicable tip-credit rules vary.']]},
      {id:'calculate',toc:'Your hourly result',title:'Measure your own true hourly earnings',paragraphs:['For each shift, add direct wages to tips kept after tip-out, then divide by all hours worked. Compare several weeks rather than judging the job from one unusually strong or weak shift.'],table:{headers:['Step','Formula'],rows:[['Net tips','Gross tips − tip-out'],['Total shift earnings','Net tips + direct wages'],['True hourly earnings','Total shift earnings ÷ hours worked']]}}
    ], sources:[{label:'U.S. Bureau of Labor Statistics — Bartenders',url:'https://www.bls.gov/ooh/food-preparation-and-serving/bartenders.htm'},DOL],
    related:[{title:'How much do servers make in tips?',url:'/tiphaven/how-much-do-servers-make-in-tips/'},{title:'Server tip-out percentage explained',url:'/tiphaven/server-tip-out-percentage/'}]
  },
  {
    slug:'best-tip-tracking-apps-for-servers', title:'Best Tip Tracking App for Servers — What to Look For', h1:'The best tip tracking app is the one you will still use after a long shift',
    description:'Choose a tip tracking app by privacy, speed, tip-out support, hourly earnings, exports and pricing. Includes a transparent TipHaven self-assessment.',
    lead:'Look beyond screenshots. Speed, privacy, tip-out handling and useful comparisons determine whether a tracker becomes a real work record.',
    french:'/fr/tiphaven/application-suivi-pourboires/',
    quickAnswer:{question:'What should a server tip tracker do?',answer:'It should make a shift fast to enter, keep gross and net tips distinct, include hours and wages, show true hourly earnings, protect your privacy and let you keep a useful copy of your history.'},
    sections:[
      {id:'criteria',toc:'Six criteria',title:'Six things a server tip tracker should do well',prompts:[['Fast entry','A complete shift should take seconds, not another task after work.'],['Tip-out','Keep gross tips, tip-out and tips kept separate.'],['Hourly earnings','Combine wages, net tips and every worked hour.'],['Useful comparisons','Compare jobs, roles, weekdays and date ranges.'],['Privacy','Explain accounts, storage, analytics and backups clearly.'],['Export','Offer a practical way to review or retain the record.']]},
      {id:'checklist',toc:'Download checklist',title:'A practical pre-download checklist',list:['Can you enter a difficult shift quickly?','Does it support the tip-out method your workplace uses?','Are opening, closing and side-work hours included?','Can you compare several shifts without cherry-picking?','Where does the data live?','What is the current price and renewal model?']},
      {id:'tiphaven',toc:'Where TipHaven fits',title:'Where TipHaven fits',paragraphs:['TipHaven is designed for private iPhone tracking of tips, tip-out, wages, hours, jobs and notes. It calculates net tips, total earnings and true hourly earnings without requiring an account.'],note:'Disclosure: Kestora Labs makes TipHaven. This guide states the criteria that favor it and the situations where another product may fit better.'},
      {id:'notfit',toc:'When it does not fit',title:'When TipHaven may not be the right choice',paragraphs:['Choose another tool if you need Android support, employer payroll integration, multi-user team scheduling, automatic bank import or a cloud account shared across many devices. TipHaven is a personal work record, not payroll software.']},
      {id:'privacy',toc:'Privacy questions',title:'Privacy questions worth asking any app',list:['Is an account required?','Is shift data stored locally or on a server?','Is analytics optional?','Can the app access location, contacts or financial accounts?','How do backup, export and deletion work?']}
    ], related:[{title:'Server tips and taxes',url:'/tiphaven/server-tips-and-taxes/'},{title:'Calculate tip-out',url:'/tiphaven/tip-out-calculator/'}]
  },
  {
    slug:'how-much-do-servers-make-in-tips', title:'How Much Do Servers Make in Tips? A Practical Earnings Guide', h1:'How much do servers make in tips?',
    description:'See what servers earn, why tips vary by shift and restaurant, and how to calculate true hourly earnings using wages, tips and tip-out.',
    lead:'There is no honest single tip number. The useful answer combines national wage data with the variables that change from one shift to the next.',
    french:'/fr/tiphaven/salaire-serveur-avec-pourboires/',
    quickAnswer:{question:'How much do servers make with tips?',answer:'BLS reports a $16.93 median hourly wage for waiters and waitresses in the food-services industry in May 2025, including tips. It is a national midpoint—not a promise for a particular server or shift.'},
    sections:[
      {id:'answer',toc:'The short answer',title:'Use the national figure as context, not a promise',paragraphs:['The BLS industry estimate combines wages and tips across many employers, schedules and regions. Your useful number is what you kept after tip-out plus direct wages, divided by every hour worked.']},
      {id:'variables',toc:'Why tips vary',title:'What changes a server’s tip earnings?',prompts:[['Restaurant','Price point, volume and service style.'],['Shift','Day, time, section and customer traffic.'],['Role','Server, bartender and support responsibilities.'],['Tip-out','The base, rate and eligible recipients.'],['Location','Local wages, prices and applicable law.'],['Hours','Side work and waiting time affect the real hourly result.']]},
      {id:'calculate',toc:'Calculate a shift',title:'Calculate what your shift paid',table:{headers:['Step','Formula'],rows:[['Net tips','Gross tips − tip-out'],['Direct wages','Hourly wage × hours worked'],['Total earnings','Net tips + direct wages'],['True hourly earnings','Total earnings ÷ all hours worked']]}},
      {id:'compare',toc:'Build an average',title:'One shift is not an average',paragraphs:['Track several weeks and compare like with like: the same job, role or weekday. Keep unusually large events visible without letting them define the whole pattern.']}
    ], sources:[{label:'U.S. Bureau of Labor Statistics — Food services and drinking places',url:'https://www.bls.gov/iag/tgs/iag722.htm'},DOL],
    related:[{title:'Average bartender salary with tips',url:'/tiphaven/average-bartender-salary-with-tips/'},{title:'Tip-out calculator',url:'/tiphaven/tip-out-calculator/'}]
  },
  {
    slug:'server-tip-out-percentage', title:'Server Tip-Out Percentage — How the Math Actually Works', h1:'Server tip-out percentage: the base matters as much as the rate',
    description:'Understand server tip-out percentages based on tips or sales, compare examples, and calculate the effect on net and hourly earnings.',
    lead:'“We tip out 3%” is incomplete. Three percent of sales and three percent of tips produce very different results.',
    french:'/fr/tiphaven/pourcentage-repartition-pourboires/',
    quickAnswer:{question:'What is a normal server tip-out percentage?',answer:'There is no universal percentage. The workplace, roles receiving the tip-out, calculation base and applicable law all matter. Always ask whether the rate applies to sales, gross tips or another base.'},
    sections:[
      {id:'normal',toc:'What is normal',title:'There is no useful rate without its base',paragraphs:['A small percentage of sales can exceed a much larger percentage of tips. Compare the actual dollar tip-out and resulting net earnings, not the headline rate alone.']},
      {id:'bases',toc:'Common bases',title:'Common tip-out bases',prompts:[['Gross tips','A percentage of cash and card tips before distributions.'],['Total sales','A percentage of all sales assigned to the server.'],['Category sales','Food, beverage or alcohol sales only.'],['Fixed amount','A set amount per shift or role.'],['Points or hours','A pool distributed by weighted role or time.']]},
      {id:'examples',toc:'Worked examples',title:'Two rates that look nothing alike',table:{headers:['Method','Shift inputs','Tip-out'],rows:[['15% of tips','$240 gross tips','$36'],['3% of sales','$1,800 sales','$54']]},note:'The 3% rate produces the larger tip-out because it uses a much larger base.'},
      {id:'evaluate',toc:'Evaluate a shift',title:'Evaluate the complete shift',paragraphs:['Subtract tip-out from gross tips, add direct wages and divide by all hours worked. Then compare the same method across enough shifts to see a pattern.']},
      {id:'rules',toc:'Rules vary',title:'Federal and state rules matter',paragraphs:['U.S. federal rules address tip credits, pooling and who may participate. State and local rules may be more protective. A calculator can perform arithmetic but cannot decide whether a workplace policy is lawful.']}
    ], sources:[DOL], related:[{title:'Tip-out calculator',url:'/tiphaven/tip-out-calculator/'},{title:'Splitting tips by hours worked',url:'/tiphaven/splitting-tips-by-hours-worked/'}]
  },
  {
    slug:'server-tips-and-taxes', title:'Server Tips and Taxes — Recordkeeping Guide for Tipped Workers', h1:'Server tips and taxes: start with a daily record',
    description:'Understand the basic U.S. federal recordkeeping and reporting steps for server tips, including cash tips, tip pools and daily records.',
    lead:'Tips are income. Keeping the shift-level details makes employer reporting and tax-time questions much easier to reconcile.',
    french:'/fr/tiphaven/pourboires-impots/',
    quickAnswer:{question:'Are server tips taxable income?',answer:'The IRS says all tips received by employees are income. They are subject to federal income tax and generally to Social Security and Medicare taxes.'},
    safety:'This page summarizes general U.S. federal information and is not tax, accounting, legal or financial advice. Rules and personal circumstances vary; use current official guidance or a qualified professional.',
    sections:[
      {id:'basics',toc:'Federal basics',title:'The federal basics',list:['Tips received directly from customers are income.','Distributed tips from a pool or sharing arrangement are income.','Noncash tips are income but follow different employer-reporting treatment.','Daily records support monthly employer reports and the annual return.']},
      {id:'cash',toc:'What counts',title:'What the IRS treats as cash tips',paragraphs:['Cash tips include cash received directly, electronically paid tips distributed by the employer and tips received through a pool or sharing arrangement. The label “cash tips” includes more than paper currency.']},
      {id:'record',toc:'Daily record',title:'What to keep in a daily tip record',prompts:[['Date and workplace','Identify the shift and employer.'],['Cash and card tips','Record tips received before sharing.'],['Tips paid out','Keep recipients or categories when useful.'],['Pool distributions','Record amounts received from others.'],['Hours and wages','Useful for reconciling earnings, though not a substitute for payroll records.']]},
      {id:'employer',toc:'Employer reporting',title:'Reporting tips to your employer',paragraphs:['The IRS generally requires employees who receive $20 or more in cash tips in a calendar month from one employer to report them to that employer by the 10th day of the following month. Check current IRS instructions and exceptions.']},
      {id:'return',toc:'Federal return',title:'Reporting tips on your federal return',paragraphs:['All tip income must be included, including amounts that were not reported to the employer. Use current IRS forms and instructions or qualified help for your situation.']}
    ], sources:[{label:'IRS — Tip recordkeeping and reporting',url:'https://www.irs.gov/businesses/small-businesses-self-employed/tip-recordkeeping-and-reporting'},{label:'IRS Publication 531 — Reporting Tip Income',url:'https://www.irs.gov/publications/p531'}],
    related:[{title:'Best tip tracking app for servers',url:'/tiphaven/best-tip-tracking-apps-for-servers/'},{title:'Paycheck calculator with tips',url:'/tiphaven/paycheck-calculator-with-tips/'}]
  },
  {
    slug:'splitting-tips-by-hours-worked', title:'Splitting Tips by Hours Worked — Formula and Examples', h1:'Splitting tips by hours worked, step by step',
    description:'Learn how to split tips proportionally by hours worked, handle rounding, compare equal and hours-based methods, and use a free tip pool calculator.',
    lead:'An hours-based split gives every eligible worked hour the same value, then multiplies that rate by each person’s time.',
    french:'/fr/tiphaven/repartir-pourboires-heures-travaillees/',
    quickAnswer:{question:'How do you split tips by hours worked?',answer:'Add all eligible hours, divide the distributable tip pool by that total, then multiply the hourly pool rate by each person’s hours. Adjust final cents so the distributed total matches the pool exactly.'},
    sections:[
      {id:'steps',toc:'Four steps',title:'The four-step method',list:['Subtract any documented deduction that applies before distribution.','Add every eligible person’s hours.','Divide distributable tips by total eligible hours.','Multiply that hourly pool rate by each person’s hours.']},
      {id:'example',toc:'Worked example',title:'Worked example',table:{headers:['Person','Hours','Share of a $480 pool'],rows:[['Alex','8','$213.33'],['Jordan','6','$160.00'],['Sam','4','$106.67'],['Total','18','$480.00']]},note:'The unrounded hourly pool rate is $26.666…; final cents must be assigned deliberately.'},
      {id:'rounding',toc:'Rounding',title:'Handle the final cents deliberately',paragraphs:['Calculate with full precision first, then round currency to two decimals. Assign any remaining cent difference consistently—for example, to the largest unrounded remainders—so the final allocation equals the pool.']},
      {id:'compare',toc:'Equal vs hours',title:'Equal split versus hours worked',table:{headers:['Method','Best when','Tradeoff'],rows:[['Equal split','Every eligible person should receive the same amount','Ignores different shift lengths'],['Hours worked','Every eligible hour should carry equal value','Requires accurate eligible-hour records'],['Points or roles','Responsibilities have agreed weights','Needs a clear documented policy']]}},
      {id:'rules',toc:'Eligibility',title:'The formula does not decide eligibility',paragraphs:['The workplace policy and applicable law determine who participates and which hours count. Under U.S. federal rules, managers and supervisors generally may not receive employees’ pooled tips. State rules may be more protective.']}
    ], sources:[DOL], related:[{title:'Tip pool calculator',url:'/tiphaven/tip-pool-calculator/'},{title:'Server tip-out percentage',url:'/tiphaven/server-tip-out-percentage/'}]
  }
];
