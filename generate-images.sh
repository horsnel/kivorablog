#!/bin/bash
# Batch image generation script for all 50 blog posts
# Generates hero (1344x768), mid (1344x768), cta (1344x768), and thumb (1152x864) images

OUTPUT_DIR="/home/z/my-project/kivorablog/public/images/posts"
mkdir -p "$OUTPUT_DIR"

# Category-based color schemes for prompts
get_color_scheme() {
  case "$1" in
    build)    echo "blue neon accent, deep dark background, tech code circuit board" ;;
    automate) echo "purple violet accent, deep dark background, workflow nodes connection" ;;
    monetize) echo "green emerald accent, deep dark background, money revenue growth chart" ;;
    scale)    echo "amber orange gold accent, deep dark background, growth arrow upward expansion" ;;
    stories)  echo "red crimson accent, deep dark background, people silhouette narrative" ;;
  esac
}

# Hero image prompt - dramatic, wide banner
hero_prompt() {
  local slug="$1"
  local title="$2"
  local category="$3"
  local colors=$(get_color_scheme "$category")
  echo "Wide banner illustration for a tech blog article titled '${title}', ${colors}, modern dark UI design, abstract geometric shapes, glowing lines, professional minimalist tech illustration, no text, no letters, no words, 16:9 cinematic composition, high contrast, dramatic lighting"
}

# Mid image prompt - supporting illustration, more specific
mid_prompt() {
  local slug="$1"
  local title="$2"
  local category="$3"
  local colors=$(get_color_scheme "$category")
  echo "Supporting illustration for tech article about '${title}', ${colors}, step-by-step process diagram style, abstract workflow visualization, modern dark theme, professional tech illustration, no text, no letters, no words, clean geometric design, soft glow effects"
}

# CTA image prompt - action-oriented with space for text overlay (darker bottom half)
cta_prompt() {
  local slug="$1"
  local title="$2"
  local category="$3"
  local colors=$(get_color_scheme "$category")
  echo "Call-to-action banner for tech blog, ${colors}, dark gradient background fading to black at bottom half, abstract tech patterns at top, glowing geometric accents, modern dark UI, space for text overlay at bottom, no text, no letters, no words, professional minimalist, cinematic dark moody"
}

# Thumbnail prompt - eye-catching, compact
thumb_prompt() {
  local slug="$1"
  local title="$2"
  local category="$3"
  local colors=$(get_color_scheme "$category")
  echo "Blog post thumbnail icon for article about '${title}', ${colors}, compact square composition, single focal point, bold abstract geometric shape, glowing accent, modern dark tech aesthetic, no text, no letters, no words, eye-catching, vibrant accent color, simple clean design"
}

# All 50 posts
POSTS=(
  "how-to-build-saas-nextjs-supabase-groq-free|build|How to Build a Full SaaS Product With Next.js Supabase and Groq"
  "build-whatsapp-bot-business-complete-guide|build|How to Build and Sell a WhatsApp Bot Business"
  "cloudflare-workers-beginner-to-production|build|Cloudflare Workers From Zero to Production API"
  "build-telegram-bot-nodejs-complete|build|Build a Telegram Bot That Makes Money Node.js"
  "mobile-app-react-native-expo-complete-guide|build|Build a Mobile App With React Native and Expo"
  "build-rest-api-nodejs-express-postgresql|build|Build a Production REST API With Node.js Express PostgreSQL"
  "build-chrome-extension-complete-guide|build|Build a Chrome Extension That People Pay For"
  "build-no-code-saas-bubble-supabase|build|Build a No-Code SaaS With Bubble and Supabase"
  "build-ecommerce-store-nextjs-stripe-paystack|build|Build E-Commerce Store With Next.js Stripe Paystack"
  "deploy-multiple-projects-cloudflare-zero-cost|build|Deploy 10 Projects for Free Using Cloudflare"
  "n8n-complete-beginners-guide-2026|automate|n8n Complete Beginners Guide Build Your First Automation"
  "make-com-automation-masterclass|automate|Make.com Automation Masterclass 10 Workflows"
  "ai-prompts-that-replace-employees|automate|25 AI Prompts That Replace Hours of Employee Work"
  "zapier-automation-guide-real-workflows|automate|Zapier Automation 8 Real Workflows That Pay"
  "google-apps-script-automation-free|automate|Google Apps Script Automate Everything for Free"
  "build-ai-customer-support-agent-free|automate|Build AI Customer Support Agent Handles 80 Percent Tickets"
  "airtable-automation-database-guide|automate|Airtable Automation Turn Database Into Business OS"
  "voice-ai-agents-build-deploy|automate|How to Build Voice AI Agents Phone Calls IVR"
  "email-automation-sequences-that-convert|automate|Email Automation Sequences That Actually Convert"
  "python-automation-scripts-businesses|automate|Python Automation Scripts Every Business Owner Should Know"
  "how-to-price-saas-product-correctly|monetize|How to Price Your SaaS Framework That Maximises Revenue"
  "affiliate-marketing-with-ai-complete-guide|monetize|Affiliate Marketing With AI Complete Playbook"
  "build-digital-product-business-gumroad-selar|monetize|Build Digital Product Business Selling Templates Online"
  "freelancing-with-ai-double-rate-work-less|monetize|How to Use AI to Double Your Freelance Rate"
  "youtube-monetization-every-revenue-stream|monetize|YouTube Monetization Every Revenue Stream Explained"
  "build-subscription-business-recurring-revenue|monetize|Build Subscription Business Complete Recurring Revenue Guide"
  "sell-ai-automation-services-to-businesses|monetize|Sell AI Automation Services to Businesses Complete Guide"
  "newsletter-monetization-zero-to-5000-month|monetize|Monetise Email Newsletter From Zero to 5000 Month"
  "dropshipping-with-ai-complete-guide-2026|monetize|Dropshipping 2026 Honest Guide With AI Advantages"
  "build-micro-saas-solo-developer|monetize|Build Micro-SaaS That Makes 5000 Month as Solo Developer"
  "how-to-hire-first-employee-remote-team|scale|How to Hire Your First Employee Without Expensive Mistakes"
  "build-systems-replace-yourself-business|scale|Build Systems That Let You Step Back From Business"
  "grow-saas-from-100-to-1000-customers|scale|Grow SaaS From 100 to 1000 Customers Growth Playbook"
  "content-marketing-strategy-saas-growth|scale|Content Marketing That Actually Grows a SaaS"
  "agency-to-productised-service-transition|scale|Transition From Agency to Productised Service Double Revenue"
  "seo-link-building-guide-free|scale|Link Building for Bootstrapped SaaS 8 Free Tactics"
  "build-advisor-network-grow-faster|scale|Build Advisor Network That Accelerates Your Growth"
  "raise-prices-without-losing-customers|scale|Raise Prices Without Losing Customers Real Playbook"
  "cold-outreach-that-books-meetings|scale|Cold Outreach That Books Meetings 15 Percent Reply Rate"
  "international-expansion-african-startup|scale|African Startups Scale Internationally Practical Playbook"
  "how-paystack-was-built-and-sold-to-stripe|stories|How Paystack Was Built in Nigeria and Sold to Stripe"
  "andela-story-african-talent-global-companies|stories|How Andela Built 1.5 Billion Business African Developers"
  "bootstrap-saas-africa-zero-to-250k-arr|stories|Bootstrapped SaaS in Lagos to 250k ARR"
  "flutterwave-from-startup-to-unicorn|stories|How Flutterwave Became Africa Most Valuable Startup"
  "nigerian-freelancer-to-global-product-company|stories|Nigerian Freelancer to Global Product Company Journey"
  "mpesa-how-kenya-changed-mobile-payments|stories|M-Pesa How Kenya Built World Most Advanced Mobile Payments"
  "content-creator-to-business-owner-real-story|stories|From Broke Creator to 8M Per Month Three Year Journey"
  "interswitch-africa-first-payment-network|stories|Interswitch Africa First Indigenous Payment Network"
  "failed-startup-lessons-1-million-burned|stories|Raised 1M for Startup That Failed What Went Wrong"
  "remote-work-africa-diaspora-salaries|stories|African Professionals Remote Jobs 60k to 150k USD"
)

# Process a single post - generate all 4 images
generate_post_images() {
  local entry="$1"
  IFS='|' read -r slug category title <<< "$entry"
  
  local hero_file="$OUTPUT_DIR/${slug}-hero.png"
  local mid_file="$OUTPUT_DIR/${slug}-mid.png"
  local cta_file="$OUTPUT_DIR/${slug}-cta.png"
  local thumb_file="$OUTPUT_DIR/${slug}-thumb.png"
  
  # Skip if all 4 images already exist
  if [[ -f "$hero_file" && -f "$mid_file" && -f "$cta_file" && -f "$thumb_file" ]]; then
    echo "SKIP: $slug (all images exist)"
    return 0
  fi
  
  echo "Generating images for: $slug"
  
  # Hero image (1344x768)
  if [[ ! -f "$hero_file" ]]; then
    z-ai-generate -p "$(hero_prompt "$slug" "$title" "$category")" -o "$hero_file" -s 1344x768 2>/dev/null
    echo "  ✓ hero"
  fi
  
  # Mid image (1344x768)
  if [[ ! -f "$mid_file" ]]; then
    z-ai-generate -p "$(mid_prompt "$slug" "$title" "$category")" -o "$mid_file" -s 1344x768 2>/dev/null
    echo "  ✓ mid"
  fi
  
  # CTA image (1344x768)
  if [[ ! -f "$cta_file" ]]; then
    z-ai-generate -p "$(cta_prompt "$slug" "$title" "$category")" -o "$cta_file" -s 1344x768 2>/dev/null
    echo "  ✓ cta"
  fi
  
  # Thumbnail (1152x864 -> but we want 16:9 so use 1344x768 for consistency, displayed as 16:9)
  if [[ ! -f "$thumb_file" ]]; then
    z-ai-generate -p "$(thumb_prompt "$slug" "$title" "$category")" -o "$thumb_file" -s 1344x768 2>/dev/null
    echo "  ✓ thumb"
  fi
  
  echo "  DONE: $slug"
}

# Main execution - process posts based on argument (for parallel execution)
# Usage: ./generate-images.sh <start_index> <count>
START=${1:-0}
COUNT=${2:-50}

echo "Generating images for posts $START to $((START + COUNT - 1))..."

for i in $(seq $START $((START + COUNT - 1))); do
  if [[ $i -ge ${#POSTS[@]} ]]; then break; fi
  generate_post_images "${POSTS[$i]}"
done

echo "Batch complete: posts $START to $((START + COUNT - 1))"
