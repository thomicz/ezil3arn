import FlashcardDeck from "@/components/FlashcardDeck";

export default function FlashcardsPage() {
    return (
        <FlashcardDeck
            title="Učení"
            endpoint="/api/flashcards"
        />
    );
}