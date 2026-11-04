---
title: "Study — Showing uncertainty and evidence"
category: 09-design
tags: [frontend, reference, synthesis, evaluation]
sources: ["https://support.google.com/travel/answer/7664728", "https://techcrunch.com/2023/08/28/google-flights-will-now-tell-you-when-its-the-cheapest-time-to-book", "https://going.com/guides/how-to-use-hopper", "https://support.apple.com/102594", "https://apps.apple.com/us/app/carrot-weather-alerts-radar/id961390574", "https://my.clevelandclinic.org/resources/test-results-procedures", "https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work", "https://www.cjr.org/tow_center/we-compared-eight-ai-search-engines-theyre-all-bad-at-citing-news.php", "https://ourworldindata.org/grapher/life-expectancy", "https://idl.uw.edu/papers/explaining-the-gap", "https://pmc.ncbi.nlm.nih.gov/articles/PMC5891666/"]
summary: "How 10 products and the research show uncertainty, ranges and sources to non-experts, and what that means for our reason line, confidence words, usual-range bar, source taps and escalate state."
base_confidence: 0.6
lifecycle: draft
lifecycle_changed: 2026-11-05
tier: supporting
created: 2026-11-05T01:00:00Z
updated: 2026-11-05T01:00:00Z
---
# Study — Showing uncertainty and evidence

> Studied by the UIUX seat on 2026-11-05 from public sources (no accounts). "Seen: opened" = the live public page was read; "researched" = docs, reviews and articles.

This builds on [[09-design/design-evidence|Design evidence]] (Gigerenzer, frequency dots, harm anchors, Liu 2023, Wysa) and doesn't repeat it. The live Google Flights and Perplexity pages wouldn't render in a text fetch, so both are **researched**, not opened. Our World in Data is the only product here that was **opened**.

## Takeaways for our screens

1. **Confidence line: a word plus a count, never a word alone.** In a road-salting experiment, categorical advice alone didn't improve decisions, but advice *plus* an uncertainty estimate did best and raised trust ([Joslyn & LeClerc 2012](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE:%22Uncertainty%20forecasts%20improve%20weather-related%20decisions%22&format=json&resultType=core)). Stating uncertainty cost only a little trust, and most of that drop came from *verbal* uncertainty ([van der Bles 2020, PNAS](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1073/pnas.1913678117&format=json&resultType=core)). People also read "likely" very differently ([HBR 2018](https://hbr.org/2018/07/if-you-say-something-is-likely-how-likely-do-people-think-it-is)). → "Short walk? **Fairly sure:** a walk helped in 4 of your last 6 sessions like this." Fix our 2–3 confidence words in a calibrated table that the CTO signs off, and never use them loosely in other copy. ^[inferred]
2. **The usual-range bar needs a labelled "worth a look" line, not H/L flags or a red gradient.** For near-normal lab values, a number line with one labelled harm anchor cut urgent-contact intent to about 35%, from 48–58% ([Zikmund-Fisher 2018](https://pmc.ncbi.nlm.nih.gov/articles/PMC5891666/)). Number lines beat tables, but gradient lines made people *most* sensitive to small changes ([Zikmund-Fisher 2017, JAMIA](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=AUTH:%22Zikmund-Fisher%22%20AND%20TITLE:%22urgent%22%20AND%20TITLE:%22laboratory%22&format=json&resultType=core)). → A neutral bar of *your* range, a dot for today, and one quiet labelled tick for "a pattern worth talking about", which shows only in the escalate context. ^[inferred]
3. **Not enough data is normal product behaviour.** Google Flights shows its price-history insight only on routes with enough data ([AFAR 2023](https://www.afar.com/magazine/how-to-use-googles-cheapest-flight-tool)). Apple's next-hour rain exists in only five countries ([Apple](https://support.apple.com/102594)). Hopper predicts only once you've picked dates ([BGR via search](https://bgr.com/?p=4411549)). → Our abstain card copies their calm: it says what's missing and stays the same visual weight as a suggestion. ^[inferred]
4. **Source taps work at three depths.** The pattern is a chip on the clause, then a preview popover, then a full list. ChatGPT search runs publisher chips → a popover with 1/N paging → a Sources sidebar ([aiuxplayground teardown](https://www.aiuxplayground.com/teardowns/chatgpt/citations)). Our World in Data adds "retrieved on" dates and states its own processing. → Clause marker → record sheet (device · time · last sync · "worked out by this app from …") → the full History record. ^[inferred]
5. **A citation is not proof, so link to records, not to papers.** AI search tools were wrong on over 60% of test queries and rarely hedged. ChatGPT search signalled low confidence only 15 times in 200 answers ([Tow Center, CJR 2025](https://www.cjr.org/tow_center/we-compared-eight-ai-search-engines-theyre-all-bad-at-citing-news.php)). → Every reason clause maps to a timestamped record, with a one-tap "This looks wrong" (Perplexity offers wrong-source feedback). ^[inferred]
6. **Reason line: a forecast sentence first, a labelled picture second.** Apple Weather leads with a sentence above an intensity chart. Users still ask what its unlabelled bars mean ([Apple Community](https://discussions.apple.com/thread/256047552)). → Every bar, dot and tick carries words. Nothing is meaningful only through shape or colour. ^[inferred]
7. **Escalate: say it's not a diagnosis, then offer one door to a person.** Patients overwhelmingly want results straight away, but abnormal results were over 3× as likely to leave them more worried ([UT Southwestern on Steitz 2023](https://www.utsouthwestern.edu/newsroom/articles/year-2023/march-medical-test-results-online.html)). The portal copy that helps says an out-of-range result doesn't always mean something is wrong, and that the next step is to message the provider's office ([Cleveland Clinic](https://my.clevelandclinic.org/resources/test-results-procedures)). → "This isn't a diagnosis. 9 of 14 nights under 6 h is worth mentioning to someone." Then the ladder from [[09-design/design-evidence|Design evidence]]. ^[inferred]
8. **Personality is opt-in, and off at serious moments.** CARROT's snark is a dial whose default end is "Professional", and politics is a separate switch ([App Store](https://apps.apple.com/us/app/carrot-weather-alerts-radar/id961390574)). Guess-then-reveal improves recall ([Kim et al. 2017](https://idl.uw.edu/papers/explaining-the-gap)), but it belongs in the weekly recap, never on the live card. ^[inferred]

## A pattern library for uncertainty

| Pattern | Who does it | What it looks like | When it fits us | Source |
|---|---|---|---|---|
| Today on a typical range | Google Flights; Apple Weather Averages | A low / typical / high judgement against history; today vs the historical normal range for the date | Usual-range bars (personal 28-night range, not population) | https://techcrunch.com/2023/08/28/google-flights-will-now-tell-you-when-its-the-cheapest-time-to-book · https://www.macstories.net/reviews/the-weather-app-adds-more-detailed-data-in-ios-17-ipados-17-and-macos-sonoma/ |
| Verdict + confidence qualifier + caveat | Google Flights tips | "Prices are unlikely to drop", shown only with a "high degree of confidence", plus a standing caveat that prices may not behave as expected | Suggestion headline + confidence line | https://support.google.com/travel/answer/7664728 |
| Action + deadline | Hopper | "Wait" beside the price, plus a suggested book-by date | Snooze: "Back at 15:40" | https://going.com/guides/how-to-use-hopper |
| Short-horizon forecast sentence over a chart | Apple Weather next-hour | A sentence on when rain starts or stops, above minute-by-minute intensity bars | The reason line for the next 10–30 min | https://discussions.apple.com/thread/253617354 |
| Withhold where unsupported | Google Flights history; Apple next-hour | The feature simply doesn't appear without enough data or coverage | The abstain state | https://www.afar.com/magazine/how-to-use-googles-cheapest-flight-tool |
| Value + standard range + flag | MyChart | The number beside a reference range, with H/L flags | Take the range; reject the flag | https://my.clevelandclinic.org/resources/test-results-procedures |
| Harm anchor | Research (Zikmund-Fisher) | One labelled threshold line outside the normal band | Escalate threshold on the history bar | https://pmc.ncbi.nlm.nih.gov/articles/PMC5891666/ |
| Frequency framing / quantile dots | Research (Kay 2016; Fernandes 2018) | 20–50 dots, each one outcome | The "Why?" drawer only | https://idl.uw.edu/papers/uncertainty-bus |
| Icon array | Research (Galesic 2009) | A grid of icons, some filled | The weekly recap ("4 of 6 walks helped") | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:19290713%20AND%20SRC:MED&format=json&resultType=core |
| Calibrated verbal scale | IPCC (likely, very likely…) [unverified: guidance note not opened] | Fixed words mapped to fixed probability bands | Our confidence words | https://hbr.org/2018/07/if-you-say-something-is-likely-how-likely-do-people-think-it-is |
| Inline numbered citations | Perplexity | Small numbers after a claim; tap to open | Clause markers in the reason | https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work |
| Chip → popover → sidebar | ChatGPT search | A publisher pill, a preview with 1/N paging, then all sources | Record sheet depth | https://www.aiuxplayground.com/teardowns/chatgpt/citations |
| Sources and processing panel | Our World in Data | Source, retrieved date, last and next update, and "with major processing by" | The Data sources screen and record sheet | https://ourworldindata.org/grapher/life-expectancy |
| Guess, then reveal | NYT "You Draw It"; research (Kim 2017) | Draw your guess, then see the real line and others' guesses | Weekly recap only | https://idl.uw.edu/papers/explaining-the-gap |
| Opt-in personality dial | CARROT Weather | Professional → Overkill slider; separate politics setting | A tone setting, if ever (default plain) | https://apps.apple.com/us/app/carrot-weather-alerts-radar/id961390574 |
| Choose your data source | CARROT Weather | Switch between AccuWeather, Apple Weather, Foreca and others | Show which device fed which clause | https://www.meetcarrot.com/weather/ |

The research behind the table, briefly. Quantile dotplots with 50 outcomes gave about 97% of the optimal payoff in a bus-catching task, 5 points better than no uncertainty, while text-only uncertainty did worse ([Fernandes et al. 2018](https://idl.uw.edu/papers/uncertainty-bus)). Dotplots are built for small screens and cut the variance of people's estimates about 1.15× compared with density plots ([Kay et al. 2016](https://idl.uw.edu/papers/when-ish-is-my-bus)). Icon arrays improved risk understanding for low- *and* high-numeracy people, and larger arrays made risks feel bigger ([Galesic et al. 2009](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:19290713%20AND%20SRC:MED&format=json&resultType=core)). → For our small n (6 sessions), show 6 real dots, never an implied 100. ^[inferred]

## Google Flights (price insights)

- **What it is · who · platform · price:** Google's flight search; travellers; web and mobile web; free.
- **Seen:** researched (the live page and the logged-out view wouldn't render in a text fetch).
- **Key screens and flows:** Search → results with a price insight (low / typical / high against past averages) → price history → tips ("Book soon / Book now" on mobile) → opt-in price tracking ([Google Help](https://support.google.com/travel/answer/7664728); [TechCrunch 2023](https://techcrunch.com/2023/08/28/google-flights-will-now-tell-you-when-its-the-cheapest-time-to-book)).
- **Mechanisms:**
  - The labels date to 2018 and are based on historical prices for the route ([search summary of 2018 coverage](https://9to5google.com/2018/08/27/google-flights-hotel-search-holiday-deal/)).
  - The "typical" band is reportedly given as a dollar range for similar trips [described].
  - The predictive tips appear only with high confidence and come with a standing caveat that future prices may not behave as expected ([Google Help](https://support.google.com/travel/answer/7664728)).
  - "Cheapest time to book" shows only on routes with enough data ([AFAR](https://www.afar.com/magazine/how-to-use-googles-cheapest-flight-tool)).
  - A "price guarantee" pilot refunds the difference if Google's no-drop prediction is wrong ([TechCrunch](https://techcrunch.com/2023/08/28/google-flights-will-now-tell-you-when-its-the-cheapest-time-to-book)).
- **Visual style:** a horizontal bar split into three segments with a marker for today [described; no source text describes the bar].
- **Copy and tone:** a judgement first ("low for your search"), then the evidence. Prediction verbs are hedged ("unlikely", "likely").
- **What users love / complain about:** Reviewers praise the history view; the feature doesn't cover every city pair ([search summary](https://flyertalk.com/articles/google-flights-now-displays-flight-price-history-insights.html)) [described].
- **Steal:** an only-when-confident tip plus a standing caveat → a confidence line that disappears below threshold (the card abstains) → the suggestion card. Also: the range as words *and* a bar → the signal rows.
- **Avoid:** a population baseline. A student's "typical" must be their own.
- **Open questions:** how the "typical" range is computed (a percentile band?); whether the bar is still on mobile in 2026.

## Hopper

- **What it is · who · platform · price:** a travel booking app with fare prediction; budget travellers; iOS and Android; free, with paid add-ons such as Price Freeze.
- **Seen:** researched.
- **Key screens and flows:** Pick dates → a colour calendar from cheapest to priciest → results with "Wait" or "Buy" and a book-by date → automatic "watch" with push alerts → a Price Freeze upsell ([Going](https://going.com/guides/how-to-use-hopper)).
- **Mechanisms:**
  - Claims 95% accuracy, while saying predictions are "not guaranteed" ([Going](https://going.com/guides/how-to-use-hopper)).
  - The forecast reads as "may drop up to $X, then rise at least $Y" ([Going](https://going.com/guides/how-to-use-hopper)).
  - Push notifications reportedly drive most bookings ([Harvard D3](https://d3.harvard.edu/platform-digit/submission/to-wait-or-not-to-wait-hopper-takes-the-guesswork-out-of-flight-purchases/index.html)).
  - The accuracy method is unpublished; a per-prediction confidence percentage is [unverified].
- **Visual style:** a green → red calendar; "Wait" in a small grey box [described].
- **Copy and tone:** directive ("Wait", "Buy now"), with the deadline as the uncertainty.
- **What users love / complain about:**
  - Users were told to wait, and prices rose ([PilotPlans](https://www.pilotplans.com/blog/hopper-review)).
  - Price Freeze charges and in-app-credit refunds feel like a bait-and-switch ([PilotPlans](https://www.pilotplans.com/blog/hopper-review)).
  - Store ratings: 3.8 on Google Play, 4.8 on the App Store ([Going](https://going.com/guides/how-to-use-hopper)).
- **Steal:** advice with an exact time ("wait until …") → snooze copy "Back at 15:40".
- **Avoid:**
  - An accuracy claim with no method.
  - Selling insurance against your own prediction.
  - Red/green colouring.
  - Notifications as the business model.
- **Open questions:** does Hopper show anything when it isn't sure, or does it always pick buy or wait?

## Apple Weather (next-hour precipitation)

- **What it is · who · platform · price:** the built-in iOS weather app (Dark Sky's successor); every iPhone user; free.
- **Seen:** researched.
- **Key screens and flows:** the next-hour card (a sentence plus a minute-by-minute chart) → rain notifications → Averages (iOS 17).
- **Mechanisms:**
  - Next-hour rain and its notifications work only in Australia, Ireland, Japan, the UK and the US, using national weather service data ([Apple](https://support.apple.com/102594)).
  - The chart appears only when rain is falling or possible ([Apple Community](https://discussions.apple.com/thread/253617354)).
  - The Averages tile compares today with the historical normal range for the date, with a graph ([MacStories](https://www.macstories.net/reviews/the-weather-app-adds-more-detailed-data-in-ios-17-ipados-17-and-macos-sonoma/)). Its exact baseline period is disputed between sources [unverified].
- **Visual style:** vertical bars in three intensity zones (light, medium, heavy), per a community answer, not Apple ([Apple Community](https://discussions.apple.com/thread/256047552)).
- **Copy and tone:** "Rain starting/stopping in N min" [described; users report the label sometimes missing]. No probability words on the next-hour card.
- **What users love / complain about:**
  - The bars have no label or scale ([Apple Community](https://discussions.apple.com/thread/256047552)).
  - Accuracy opinions split: some say it matches Dark Sky ([MacRumors forum](https://forums.macrumors.com/threads/apple-acquired-weather-app-dark-sky-reminding-users-that-ios-app-shutting-down-on-january-1.2358768/page-6)), others call it hit or miss ([iMore forum](https://forums.imore.com/threads/apple-weather-is-still-not-on-par-with-dark-sky-in-my-opinion.455970/latest)). All anecdotal.
- **Steal:**
  - A sentence with a time, over a simple chart → the reason line plus an optional 30-min strip.
  - The Averages tile → today against *your* normal range.
- **Avoid:** unlabelled marks, and implied precision ("12 min") that the model can't back.
- **Open questions:** does Apple ever show a probability on the next-hour card?

## CARROT Weather

- **What it is · who · platform · price:** a weather app with a sarcastic AI persona; enthusiasts. On iOS, Premium costs $4.99/month or $19.99/year, with higher Ultra tiers ([App Store](https://apps.apple.com/us/app/carrot-weather-alerts-radar/id961390574)).
- **Seen:** researched.
- **Key screens and flows:** forecast + quip → Settings › Personality → data source switcher (Premium).
- **Mechanisms:**
  - The personality runs from "professional" to "overkill". Professional disables the snark ([App Store](https://apps.apple.com/us/app/carrot-weather-alerts-radar/id961390574); [TidBITS](https://tidbits.com/2018/01/22/carrot-weather-predicts-cloudy-with-a-chance-of-snark/)).
  - Politics is a separate setting [described].
  - Sources are switchable between AccuWeather, Apple Weather, Foreca and others ([CARROT](https://www.meetcarrot.com/weather/)).
- **Visual style:** characters and illustrations, hidden in Professional mode [described, MacStories 4.2 via search].
- **Copy and tone:** jokes wrap the data; the numbers stay straight.
- **What users love / complain about:**
  - 4.7★ from about 88K ratings.
  - Reviewers love the data even in Professional mode ([iPhone JD](https://www.iphonejd.com/?p=944)).
  - Complaints focus on the paywall, not the tone ([App Store](https://apps.apple.com/us/app/carrot-weather-alerts-radar/id961390574)).
- **Steal:** tone as an explicit, reversible setting → if we ever add warmth, it's opt-in, and consent, escalate and delete are always plain.
- **Avoid:** humour by default for a tired or anxious student; paywalling which source you trust.
- **Open questions:** does the persona ever joke about bad weather alerts? [unverified]

## Epic MyChart (lab results)

- **What it is · who · platform · price:** a patient portal run by health systems; US patients; web, iOS and Android; free to patients.
- **Seen:** researched (it needs an account).
- **Key screens and flows:** Test Results → result (value, reference range, flag) → "Compare Trend (if available)" → message the provider's office ([Cleveland Clinic](https://my.clevelandclinic.org/resources/test-results-procedures)).
- **Mechanisms:**
  - Under federal rules, most results are released as soon as they're ready, often before a clinician reviews them. Some are held, for example genetic tests and some STI and HIV results, depending on the system and state ([Cleveland Clinic](https://my.clevelandclinic.org/resources/test-results-procedures)).
  - Ranges are shown "when applicable" and vary by age, sex and lab.
- **Visual style:** the value beside the range, H/L flags [described]; a range bar with a dot [unverified].
- **Copy and tone:** "Results outside the reference range don't always mean something is wrong" ([Cleveland Clinic](https://my.clevelandclinic.org/resources/test-results-procedures)). Most patients see results before any explanation.
- **What users love / complain about:**
  - Nearly 96% of 8,139 patients want immediate access. Almost half felt less worried after viewing, and 7.5% more ([UTSW](https://www.utsouthwestern.edu/newsroom/articles/year-2023/march-medical-test-results-online.html)).
  - Some patients refresh the portal anxiously while waiting ([TechTarget](https://www.techtarget.com/patientengagement/news/366622613/Are-patients-stressed-awaiting-patient-portal-test-results)) [described].
- **Steal:** a reassurance line beside the range, plus one named next step → the escalate state and history bars.
- **Avoid:** H/L flags (a verdict on the body); results with no next step.
- **Open questions:** how many health systems show a graphic range vs plain text? Does MyChart now add AI explanations? [unverified]

## Perplexity

- **What it is · who · platform · price:** an AI answer engine; general users and students; web and iOS; free, plus Pro.
- **Seen:** researched (the help centre was read; the live home page returned almost no text).
- **Key screens and flows:** Ask → answer with citations → source popover → Links/Sources view → three-dots menu → Sources / Report feedback ([Perplexity Help](https://www.perplexity.ai/help-center/en/articles/10354769-what-is-a-thread)).
- **Mechanisms:**
  - Every answer has numbered citations so you can verify it ([Perplexity Help](https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work)).
  - Newer builds reportedly show domain chips ("site +3"), a collapsible "Completed N steps", and a wrong-sources feedback option ([aiuxplayground](https://aiuxplayground.com/teardowns/compare/trust-privacy-settings)) [described].
- **Visual style:** small superscript-like markers inline; a source card row [described].
- **Copy and tone:** confident prose. Hedging is rare across AI search tools ([CJR](https://www.cjr.org/tow_center/we-compared-eight-ai-search-engines-theyre-all-bad-at-citing-news.php)).
- **What users love / complain about:** Perplexity was wrong on 37% of the Tow Center queries, and Pro was more confidently wrong than free ([CJR](https://www.cjr.org/tow_center/we-compared-eight-ai-search-engines-theyre-all-bad-at-citing-news.php)). Add Liu 2023 from [[09-design/design-evidence|Design evidence]].
- **Steal:** a marker on the clause, and wrong-source feedback → "This looks wrong" on each record.
- **Avoid:** markers that look like proof; confident prose when the evidence is thin.
- **Open questions:** do Perplexity's markers link to a specific passage or just a page?

## ChatGPT search

- **What it is · who · platform · price:** web search inside ChatGPT; general users; web, iOS and Android; free tier.
- **Seen:** researched (OpenAI's pages returned 403).
- **Key screens and flows:** answer → inline publisher chips (favicon and name, "+N") → a popover with 1/N paging → the Sources row → a sidebar of cards ([aiuxplayground](https://www.aiuxplayground.com/teardowns/chatgpt/citations)).
- **Mechanisms:** identity before click (you see *who* before you open it); three depths of verification.
- **Visual style:** pill chips; a right-hand sidebar [described].
- **Copy and tone:** confident. It signalled low confidence 15 times in 200 answers and never declined ([CJR](https://www.cjr.org/tow_center/we-compared-eight-ai-search-engines-theyre-all-bad-at-citing-news.php)).
- **What users love / complain about:**
  - Publisher names truncate.
  - The sidebar doesn't highlight the card you just opened ([aiuxplayground](https://www.aiuxplayground.com/teardowns/chatgpt/citations)).
- **Steal:** chips that say the source in words ("Watch · 01:12") → clause markers that name the device, not a number. ^[inferred]
- **Avoid:** losing the link between chip and card; on our record sheet, highlight the clause you tapped.
- **Open questions:** OpenAI's own description of the UI [unverified].

## Our World in Data

- **What it is · who · platform · price:** a non-profit data publisher; the public, students and journalists; web; free (CC BY).
- **Seen:** opened (the [life expectancy](https://ourworldindata.org/grapher/life-expectancy) and [temperature anomaly](https://ourworldindata.org/grapher/temperature-anomaly) chart pages).
- **Key screens and flows:** chart → "What you should know about this indicator" → "Sources and processing" → how to cite → download.
- **Mechanisms:**
  - Each source shows its "Retrieved on" and "Retrieved from".
  - The page shows last updated and next expected update.
  - The source line ends "with major processing by Our World in Data".
  - Uncertainty is explained in the processing notes; for example, empty grid cells add uncertainty to global means.
- **Visual style:** expandable sections under the chart; a `tab=sources` view exists in the chart URL, but its label wasn't visible in the fetched text [described].
- **Copy and tone:** neutral, explanatory, with in-line and full citations.
- **What users love / complain about:** no user research found [unverified].
- **Steal:**
  - "Last updated · next update" → "Synced 14:05 · next check about 14:20" on the record sheet.
  - "Processing by us" → "Worked out by this app from your watch's sleep data."
  - "What you should know" → "What this can't see" on the Data sources screen.
- **Avoid:** academic citation density on a phone.
- **Open questions:** OWID's style for confidence bands on line charts [unverified].

## NYT "You Draw It"

- **What it is · who · platform · price:** a 2015 Upshot interactive (Aisch, Cox, Quealy) on income and college attendance; NYT readers; web; paywalled site.
- **Seen:** researched (from secondary coverage).
- **Key screens and flows:** draw your guess on a blank chart → reveal the real curve → compare with other readers' guesses, with short feedback ([search summary of FlowingData](https://flowingdata.com/2015/05/28/compare-your-curve-to-reality-for-income-percentile-versus-college-attendance/)) [described].
- **Mechanisms:** predicting and self-explaining improved recall and comprehension even with little prior knowledge, and the effect differed between text and visual formats ([Kim, Reinecke & Hullman, CHI 2017](https://idl.uw.edu/papers/explaining-the-gap)).
- **Visual style:** a hand-drawn line over an empty axis [described].
- **Copy and tone:** playful, low stakes.
- **What users love / complain about:** widely used in classrooms ([NGPF via search](https://dev4.ngpf.org/blog/activity/question-does-family-income-level-impact-college-going-rates/)) [described].
- **Steal:** guess then reveal → the weekly recap: "How many of this week's walks do you think helped?" Then show the real count as dots. ^[inferred]
- **Avoid:** it on the live card (it's friction for a tired student), and any guess about the body that could feel like a test.
- **Open questions:** does a guess make a bad result feel worse? (Compare Gavriloff 2018 in [[09-design/design-evidence|Design evidence]].)

## The Pudding

- **What it is · who · platform · price:** a visual-essay publication; the general public; web; free.
- **Seen:** researched (thin). Its About page says the team experiments a lot ([Pudding](https://pudding.cool/faq/)). A Peabody profile calls it transparent about sources and methods ([Peabody via search](https://peabodyawards.com/award-profile/the-pudding/)) [described]. Essays carry "Data and Methods" notes at the bottom [described].
- **Mechanisms, style, tone, users:** not verified. I didn't find a Pudding piece specifically about uncertainty before the search budget ran out [unverified].
- **Steal:** a methods note in plain words at the bottom → a "How this works" page linked from the "Why?" drawer. ^[inferred]
- **Avoid:** long scrollytelling on Operate surfaces.
- **Open questions:** open three essays and record how each states its caveats.

## Steal Card check

- **S-01 Google Flights: confirmed, with corrections.** Low / typical / high against past averages for the route is confirmed ([TechCrunch](https://techcrunch.com/2023/08/28/google-flights-will-now-tell-you-when-its-the-cheapest-time-to-book)). The bar's look is **unverified**. Corrected wording: *"Shows whether today's price is low, typical or high against the route's past prices, and shows the insight only where there's enough history."* Note for our translation: their baseline is the population; ours must be personal. Still `Seen: researched`, not opened.
- **S-03 MyChart: corrected.** "Plain words" overstates it. Portals show the value, a reference range ("when applicable") and often H/L flags. The plain-language reassurance comes from health-system help pages, and the next step is messaging the provider's office ([Cleveland Clinic](https://my.clevelandclinic.org/resources/test-results-procedures)). Corrected wording: *"Shows each result beside its reference range; results may arrive before a clinician sees them; the next step is a message to the care team."* Keep the escalate translation, and add a harm-anchor line, not a flag.
- **S-04 Perplexity: confirmed, with corrections.** Numbered inline citations are confirmed ([Perplexity Help](https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work)). Newer builds reportedly use domain chips with a preview popover before the source opens [described]. Add the caveat that citations don't guarantee support ([CJR](https://www.cjr.org/tow_center/we-compared-eight-ai-search-engines-theyre-all-bad-at-citing-news.php)).
- **S-05 Apple Weather: corrected.** The sentence-over-chart pattern is confirmed; the exact "rain stopping in 12 min" wording is user-reported [described]. Corrected wording: *"A one-line next-hour statement above an intensity chart, shown only when rain is possible and only where data supports it (5 countries)."* Note that the chart's bars are unlabelled and confuse people. Our translation, "focus is likely to dip", may overclaim what the model predicts; the CTO should confirm against [[04-agent-engine/performance-model|Performance model]]. ^[inferred]

## Sources

- Google Flights help: https://support.google.com/travel/answer/7664728
- TechCrunch 2023: https://techcrunch.com/2023/08/28/google-flights-will-now-tell-you-when-its-the-cheapest-time-to-book
- AFAR 2023: https://www.afar.com/magazine/how-to-use-googles-cheapest-flight-tool
- Hopper (Going): https://going.com/guides/how-to-use-hopper
- Hopper (PilotPlans): https://www.pilotplans.com/blog/hopper-review
- Hopper (Harvard D3): https://d3.harvard.edu/platform-digit/submission/to-wait-or-not-to-wait-hopper-takes-the-guesswork-out-of-flight-purchases/index.html
- Apple Weather availability: https://support.apple.com/102594
- Apple Community threads: https://discussions.apple.com/thread/256047552 · https://discussions.apple.com/thread/253617354
- MacStories on iOS 17 Weather: https://www.macstories.net/reviews/the-weather-app-adds-more-detailed-data-in-ios-17-ipados-17-and-macos-sonoma/
- CARROT: https://apps.apple.com/us/app/carrot-weather-alerts-radar/id961390574 · https://www.meetcarrot.com/weather/ · https://tidbits.com/2018/01/22/carrot-weather-predicts-cloudy-with-a-chance-of-snark/
- Cleveland Clinic MyChart results: https://my.clevelandclinic.org/resources/test-results-procedures
- Steitz 2023 (UTSW): https://www.utsouthwestern.edu/newsroom/articles/year-2023/march-medical-test-results-online.html
- Zikmund-Fisher 2018: https://pmc.ncbi.nlm.nih.gov/articles/PMC5891666/ · 2017 JAMIA (PMID 28040686)
- Perplexity help: https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work · https://www.perplexity.ai/help-center/en/articles/10354769-what-is-a-thread
- Citation UI teardowns: https://www.aiuxplayground.com/teardowns/chatgpt/citations · https://aiuxplayground.com/teardowns/compare/trust-privacy-settings
- Tow Center 2025: https://www.cjr.org/tow_center/we-compared-eight-ai-search-engines-theyre-all-bad-at-citing-news.php
- Our World in Data (opened): https://ourworldindata.org/grapher/life-expectancy · https://ourworldindata.org/grapher/temperature-anomaly
- Kim, Reinecke & Hullman 2017: https://idl.uw.edu/papers/explaining-the-gap
- Fernandes et al. 2018: https://idl.uw.edu/papers/uncertainty-bus · Kay et al. 2016: https://idl.uw.edu/papers/when-ish-is-my-bus
- Galesic et al. 2009 (PMID 19290713) · Joslyn & LeClerc 2012 (PMID 21875244) · van der Bles et al. 2020 (PMID 32205438), all via Europe PMC
- HBR on probability words: https://hbr.org/2018/07/if-you-say-something-is-likely-how-likely-do-people-think-it-is
- The Pudding: https://pudding.cool/faq/

## Related

- [[09-design/steal-library|Steal library]] · [[09-design/design-evidence|Design evidence]] · [[04-agent-engine/performance-model|Performance model]]
