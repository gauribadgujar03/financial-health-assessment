import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_recommendation(summary):
    prompt = f"""
    Financial Summary:
    {summary}

    Give actionable recommendations for SME owners.
    """

    response = openai.ChatCompletion.create(
        model="gpt-5",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content
