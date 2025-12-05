import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Save, Edit } from "lucide-react";
import { ImageUploader } from "@/components/ImageUploader";
import { toast } from "sonner";

interface JournalEditorProps {
    content: any;
    onSave: (newContent: any) => void;
}

export const JournalEditor = ({ content, onSave }: JournalEditorProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState<any>({
        title: "",
        slug: "",
        author: "",
        date: "",
        excerpt: "",
        content: "",
        image: ""
    });

    const posts = content.journal?.posts || [];

    const handleEdit = (post: any) => {
        setCurrentPost(post);
        setIsEditing(true);
    };

    const handleCreate = () => {
        setCurrentPost({
            title: "",
            slug: "",
            author: "Raou Editorial",
            date: new Date().toLocaleDateString(),
            excerpt: "",
            content: "",
            image: "/assets/hero-background.jpg"
        });
        setIsEditing(true);
    };

    const handleDelete = (slug: string) => {
        const newContent = { ...content };
        newContent.journal.posts = posts.filter((p: any) => p.slug !== slug);
        onSave(newContent);
        toast.success("Post deleted");
    };

    const handleSave = () => {
        const newContent = { ...content };
        if (!newContent.journal) newContent.journal = { posts: [] };

        const existingIndex = newContent.journal.posts.findIndex((p: any) => p.slug === currentPost.slug);

        if (existingIndex >= 0) {
            newContent.journal.posts[existingIndex] = currentPost;
        } else {
            // Auto-generate slug if empty
            if (!currentPost.slug) {
                currentPost.slug = currentPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            }
            newContent.journal.posts.push(currentPost);
        }

        onSave(newContent);
        setIsEditing(false);
        toast.success("Post saved");
    };

    if (isEditing) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>{currentPost.slug ? "Edit Post" : "New Post"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Title</Label>
                            <Input
                                value={currentPost.title}
                                onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label>Slug</Label>
                            <Input
                                value={currentPost.slug}
                                onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label>Author</Label>
                            <Input
                                value={currentPost.author}
                                onChange={(e) => setCurrentPost({ ...currentPost, author: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label>Date</Label>
                            <Input
                                value={currentPost.date}
                                onChange={(e) => setCurrentPost({ ...currentPost, date: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <Label>Post Image</Label>
                        <ImageUploader
                            currentImagePath={currentPost.image}
                            onUploadComplete={(newPath) => setCurrentPost({ ...currentPost, image: newPath })}
                            customRequirements={{
                                name: `Post: ${currentPost.title || 'New Post'}`,
                                width: 1200,
                                height: 800,
                                maxSizeKB: 1500,
                                formats: ["jpg", "jpeg", "png", "webp"]
                            }}
                        />
                    </div>

                    <div>
                        <Label>Excerpt</Label>
                        <Textarea
                            value={currentPost.excerpt}
                            onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                            rows={3}
                        />
                    </div>

                    <div>
                        <Label>Content (Markdown)</Label>
                        <Textarea
                            value={currentPost.content}
                            onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                            rows={15}
                            className="font-mono"
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" /> Save Post</Button>
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">All Posts</h3>
                <Button onClick={handleCreate}><Plus className="w-4 h-4 mr-2" /> New Post</Button>
            </div>

            <div className="grid gap-4">
                {posts.map((post: any) => (
                    <Card key={post.slug}>
                        <CardContent className="p-4 flex justify-between items-center">
                            <div>
                                <h4 className="font-semibold">{post.title}</h4>
                                <p className="text-sm text-muted-foreground">{post.date} • {post.author}</p>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" onClick={() => handleEdit(post)}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDelete(post.slug)}>
                                    <Trash2 className="w-4 h-4 text-destructive" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};
