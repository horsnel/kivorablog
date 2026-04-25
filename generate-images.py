#!/usr/bin/env python3
"""Parallel batch image generator for Kivora Blog posts using z-ai-generate CLI"""
import subprocess
import os
import sys
from concurrent.futures import ProcessPoolExecutor, as_completed

OUTPUT_DIR = "/home/z/my-project/kivorablog/public/images/posts"
os.makedirs(OUTPUT_DIR, exist_ok=True)

COLOR_SCHEMES = {
    "build": "blue neon accent, deep dark background, tech code circuit board",
    "automate": "purple violet accent, deep dark background, workflow nodes connection",
    "monetize": "green emerald accent, deep dark background, money revenue growth chart",
    "scale": "amber orange gold accent, deep dark background, growth arrow upward expansion",
    "stories": "red crimson accent, deep dark background, people silhouette narrative",
}

POSTS = [
    ("how-to-build-saas-nextjs-supabase-groq-free", "build", "How to Build a Full SaaS Product With Next.js Supabase and Groq"),
    ("build-whatsapp-bot-business-complete-guide", "build", "How to Build and Sell a WhatsApp Bot Business"),
    ("cloudflare-workers-beginner-to-production", "build", "Cloudflare Workers From Zero to Production API"),
    ("build-telegram-bot-nodejs-complete", "build", "Build a Telegram Bot That Makes Money Node.js"),
    ("mobile-app-react-native-expo-complete-guide", "build", "Build a Mobile App With React Native and Expo"),
    ("build-rest-api-nodejs-express-postgresql", "build", "Build a Production REST API With Node.js Express PostgreSQL"),
    ("build-chrome-extension-complete-guide", "build", "Build a Chrome Extension That People Pay For"),
    ("build-no-code-saas-bubble-supabase", "build", "Build a No-Code SaaS With Bubble and Supabase"),
    ("build-ecommerce-store-nextjs-stripe-paystack", "build", "Build E-Commerce Store With Next.js Stripe Paystack"),
    ("deploy-multiple-projects-cloudflare-zero-cost", "build", "Deploy 10 Projects for Free Using Cloudflare"),
    ("n8n-complete-beginners-guide-2026", "automate", "n8n Complete Beginners Guide Build Your First Automation"),
    ("make-com-automation-masterclass", "automate", "Make.com Automation Masterclass 10 Workflows"),
    ("ai-prompts-that-replace-employees", "automate", "25 AI Prompts That Replace Hours of Employee Work"),
    ("zapier-automation-guide-real-workflows", "automate", "Zapier Automation 8 Real Workflows That Pay"),
    ("google-apps-script-automation-free", "automate", "Google Apps Script Automate Everything for Free"),
    ("build-ai-customer-support-agent-free", "automate", "Build AI Customer Support Agent Handles 80 Percent Tickets"),
    ("airtable-automation-database-guide", "automate", "Airtable Automation Turn Database Into Business OS"),
    ("voice-ai-agents-build-deploy", "automate", "How to Build Voice AI Agents Phone Calls IVR"),
    ("email-automation-sequences-that-convert", "automate", "Email Automation Sequences That Actually Convert"),
    ("python-automation-scripts-businesses", "automate", "Python Automation Scripts Every Business Owner Should Know"),
    ("how-to-price-saas-product-correctly", "monetize", "How to Price Your SaaS Framework That Maximises Revenue"),
    ("affiliate-marketing-with-ai-complete-guide", "monetize", "Affiliate Marketing With AI Complete Playbook"),
    ("build-digital-product-business-gumroad-selar", "monetize", "Build Digital Product Business Selling Templates Online"),
    ("freelancing-with-ai-double-rate-work-less", "monetize", "How to Use AI to Double Your Freelance Rate"),
    ("youtube-monetization-every-revenue-stream", "monetize", "YouTube Monetization Every Revenue Stream Explained"),
    ("build-subscription-business-recurring-revenue", "monetize", "Build Subscription Business Complete Recurring Revenue Guide"),
    ("sell-ai-automation-services-to-businesses", "monetize", "Sell AI Automation Services to Businesses Complete Guide"),
    ("newsletter-monetization-zero-to-5000-month", "monetize", "Monetise Email Newsletter From Zero to 5000 Month"),
    ("dropshipping-with-ai-complete-guide-2026", "monetize", "Dropshipping 2026 Honest Guide With AI Advantages"),
    ("build-micro-saas-solo-developer", "monetize", "Build Micro-SaaS That Makes 5000 Month as Solo Developer"),
    ("how-to-hire-first-employee-remote-team", "scale", "How to Hire Your First Employee Without Expensive Mistakes"),
    ("build-systems-replace-yourself-business", "scale", "Build Systems That Let You Step Back From Business"),
    ("grow-saas-from-100-to-1000-customers", "scale", "Grow SaaS From 100 to 1000 Customers Growth Playbook"),
    ("content-marketing-strategy-saas-growth", "scale", "Content Marketing That Actually Grows a SaaS"),
    ("agency-to-productised-service-transition", "scale", "Transition From Agency to Productised Service Double Revenue"),
    ("seo-link-building-guide-free", "scale", "Link Building for Bootstrapped SaaS 8 Free Tactics"),
    ("build-advisor-network-grow-faster", "scale", "Build Advisor Network That Accelerates Your Growth"),
    ("raise-prices-without-losing-customers", "scale", "Raise Prices Without Losing Customers Real Playbook"),
    ("cold-outreach-that-books-meetings", "scale", "Cold Outreach That Books Meetings 15 Percent Reply Rate"),
    ("international-expansion-african-startup", "scale", "African Startups Scale Internationally Practical Playbook"),
    ("how-paystack-was-built-and-sold-to-stripe", "stories", "How Paystack Was Built in Nigeria and Sold to Stripe"),
    ("andela-story-african-talent-global-companies", "stories", "How Andela Built 1.5 Billion Business African Developers"),
    ("bootstrap-saas-africa-zero-to-250k-arr", "stories", "Bootstrapped SaaS in Lagos to 250k ARR"),
    ("flutterwave-from-startup-to-unicorn", "stories", "How Flutterwave Became Africa Most Valuable Startup"),
    ("nigerian-freelancer-to-global-product-company", "stories", "Nigerian Freelancer to Global Product Company Journey"),
    ("mpesa-how-kenya-changed-mobile-payments", "stories", "M-Pesa How Kenya Built World Most Advanced Mobile Payments"),
    ("content-creator-to-business-owner-real-story", "stories", "From Broke Creator to 8M Per Month Three Year Journey"),
    ("interswitch-africa-first-payment-network", "stories", "Interswitch Africa First Indigenous Payment Network"),
    ("failed-startup-lessons-1-million-burned", "stories", "Raised 1M for Startup That Failed What Went Wrong"),
    ("remote-work-africa-diaspora-salaries", "stories", "African Professionals Remote Jobs 60k to 150k USD"),
]

PROMPT_TEMPLATES = {
    "hero": "Wide banner illustration for a tech blog article titled '{title}', {colors}, modern dark UI design, abstract geometric shapes, glowing lines, professional minimalist tech illustration, no text no letters no words, 16:9 cinematic composition, high contrast, dramatic lighting",
    "mid": "Supporting illustration for tech article about '{title}', {colors}, step-by-step process diagram style, abstract workflow visualization, modern dark theme, professional tech illustration, no text no letters no words, clean geometric design, soft glow effects",
    "cta": "Call-to-action banner for tech blog, {colors}, dark gradient background fading to black at bottom half, abstract tech patterns at top, glowing geometric accents, modern dark UI, space for text overlay at bottom, no text no letters no words, professional minimalist, cinematic dark moody",
    "thumb": "Blog post thumbnail icon for article about '{title}', {colors}, compact square composition, single focal point, bold abstract geometric shape, glowing accent, modern dark tech aesthetic, no text no letters no words, eye-catching, vibrant accent color, simple clean design",
}

def generate_image(prompt, output_path, size="1344x768"):
    """Generate a single image using z-ai-generate CLI"""
    if os.path.exists(output_path):
        return f"SKIP: {os.path.basename(output_path)}"
    try:
        result = subprocess.run(
            ["z-ai-generate", "-p", prompt, "-o", output_path, "-s", size],
            capture_output=True, text=True, timeout=120
        )
        if result.returncode == 0:
            return f"OK: {os.path.basename(output_path)}"
        else:
            return f"ERR: {os.path.basename(output_path)} - {result.stderr[:100]}"
    except subprocess.TimeoutExpired:
        return f"TIMEOUT: {os.path.basename(output_path)}"
    except Exception as e:
        return f"ERR: {os.path.basename(output_path)} - {str(e)[:100]}"

def generate_post_images(post_info):
    """Generate all 4 images for a single post"""
    slug, category, title = post_info
    colors = COLOR_SCHEMES[category]
    results = []
    
    for img_type in ["hero", "mid", "cta", "thumb"]:
        prompt = PROMPT_TEMPLATES[img_type].format(title=title, colors=colors)
        output_path = os.path.join(OUTPUT_DIR, f"{slug}-{img_type}.png")
        size = "1344x768"
        result = generate_image(prompt, output_path, size)
        results.append(result)
    
    return slug, results

def main():
    start_idx = int(sys.argv[1]) if len(sys.argv) > 1 else 0
    count = int(sys.argv[2]) if len(sys.argv) > 2 else 50
    max_workers = int(sys.argv[3]) if len(sys.argv) > 3 else 3
    
    end_idx = min(start_idx + count, len(POSTS))
    batch = POSTS[start_idx:end_idx]
    
    print(f"Generating images for posts {start_idx} to {end_idx-1} ({len(batch)} posts, {max_workers} workers)")
    print(f"Total images: {len(batch) * 4}")
    
    completed = 0
    errors = 0
    
    with ProcessPoolExecutor(max_workers=max_workers) as executor:
        futures = {executor.submit(generate_post_images, post): post for post in batch}
        
        for future in as_completed(futures):
            slug, results = future.result()
            completed += 1
            for r in results:
                if r.startswith("ERR") or r.startswith("TIMEOUT"):
                    errors += 1
            print(f"[{completed}/{len(batch)}] {slug}: {' | '.join(results)}")
    
    print(f"\nDone! Completed: {completed}, Errors: {errors}")

if __name__ == "__main__":
    main()
