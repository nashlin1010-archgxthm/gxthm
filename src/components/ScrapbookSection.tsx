import React, { useState } from 'react';
import { Sparkles, Edit2, Check, Plus, FolderHeart } from 'lucide-react';
import { PhotoUploader } from './PhotoUploader';
import { MemoryPhoto, ScrapbookCategory } from '../types';
import { SCRAPBOOK_CATEGORIES } from '../data/storyContent';

interface ScrapbookSectionProps {
  photos: MemoryPhoto[];
  onAddPhotos: (newPhotos: MemoryPhoto[]) => void;
  onDeletePhoto: (id: string) => void;
  onOpenPhoto: (photo: MemoryPhoto) => void;
}

export const ScrapbookSection: React.FC<ScrapbookSectionProps> = ({
  photos,
  onAddPhotos,
  onDeletePhoto,
  onOpenPhoto,
}) => {
  const [categories, setCategories] = useState<ScrapbookCategory[]>(SCRAPBOOK_CATEGORIES);
  const [selectedCatId, setSelectedCatId] = useState<string>(SCRAPBOOK_CATEGORIES[0].id);
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [catDraftLabel, setCatDraftLabel] = useState<string>('');
  const [newCatInput, setNewCatInput] = useState<string>('');
  const [showAddCat, setShowAddCat] = useState<boolean>(false);

  const activeCategory = categories.find((c) => c.id === selectedCatId) || categories[0];

  const handleEditCat = (cat: ScrapbookCategory) => {
    setEditingCatId(cat.id);
    setCatDraftLabel(cat.label);
  };

  const handleSaveCat = (catId: string) => {
    if (catDraftLabel.trim()) {
      setCategories(
        categories.map((c) => (c.id === catId ? { ...c, label: catDraftLabel.trim() } : c))
      );
    }
    setEditingCatId(null);
  };

  const handleAddCategory = () => {
    if (newCatInput.trim()) {
      const newCat: ScrapbookCategory = {
        id: `custom_${Date.now()}`,
        label: newCatInput.trim(),
      };
      setCategories([...categories, newCat]);
      setSelectedCatId(newCat.id);
      setNewCatInput('');
      setShowAddCat(false);
    }
  };

  return (
    <section id="section-our-moments" className="my-16">
      <div className="rounded-3xl p-6 sm:p-10 glass-wine border border-[#e2a76f]/30 shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#52101b]/70 border border-[#e2a76f]/40 text-xs text-[#e2a76f] mb-3">
            <FolderHeart className="w-3.5 h-3.5" />
            <span>Section 8 — Scrapbook of Us</span>
          </div>
          <h2 className="font-romantic text-3xl sm:text-5xl font-bold text-[#faf5ed] glow-gold">
            Our Little Memories
          </h2>
          <p className="font-romantic text-base text-[#e8ded1] mt-2 italic max-w-lg mx-auto">
            A digital scrapbook of every laugh, every ride, every call, and all our couple moments.
          </p>
        </div>

        {/* Categories Tab Selector with Editable Labels */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => {
            const isSelected = cat.id === selectedCatId;
            const isEditing = cat.id === editingCatId;

            if (isEditing) {
              return (
                <div key={cat.id} className="flex items-center gap-1 bg-[#52101b] rounded-full p-1 border border-[#e2a76f]">
                  <input
                    type="text"
                    value={catDraftLabel}
                    onChange={(e) => setCatDraftLabel(e.target.value)}
                    className="bg-transparent text-xs text-white px-2 py-0.5 outline-none w-28"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveCat(cat.id);
                    }}
                  />
                  <button
                    onClick={() => handleSaveCat(cat.id)}
                    className="p-1 rounded-full bg-[#72202c] text-white hover:bg-[#8e2b38]"
                  >
                    <Check className="w-3 h-3" />
                  </button>
                </div>
              );
            }

            return (
              <div
                key={cat.id}
                className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#72202c] text-[#faf5ed] border-[#e2a76f] shadow-[0_0_12px_rgba(226,167,111,0.4)]'
                    : 'bg-[#2a080f]/70 text-[#f3e5d8]/80 border-white/10 hover:border-[#e2a76f]/40 hover:text-white'
                }`}
                onClick={() => setSelectedCatId(cat.id)}
              >
                <span>{cat.label}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditCat(cat);
                  }}
                  className="opacity-0 group-hover:opacity-100 hover:text-[#e2a76f] transition-opacity p-0.5"
                  title="Edit label"
                >
                  <Edit2 className="w-2.5 h-2.5" />
                </button>
              </div>
            );
          })}

          {showAddCat ? (
            <div className="flex items-center gap-1 bg-[#3d0812] rounded-full p-1 border border-[#e2a76f]/50">
              <input
                type="text"
                value={newCatInput}
                onChange={(e) => setNewCatInput(e.target.value)}
                placeholder="New album name"
                className="bg-transparent text-xs text-white px-2 py-0.5 outline-none w-28"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddCategory();
                }}
              />
              <button
                onClick={handleAddCategory}
                className="p-1 rounded-full bg-[#72202c] text-white"
              >
                <Check className="w-3 h-3" />
              </button>
              <button
                onClick={() => setShowAddCat(false)}
                className="p-1 rounded-full text-stone-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAddCat(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-[#1e0509] text-[#e2a76f] border border-dashed border-[#e2a76f]/40 hover:bg-[#380710] transition-colors"
            >
              <Plus className="w-3 h-3" /> Add Label
            </button>
          )}
        </div>

        {/* Active Category Content */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#180307]/80 border border-[#e2a76f]/15">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-romantic text-xl sm:text-2xl text-[#faf5ed] font-semibold flex items-center gap-2">
              <span>{activeCategory.label}</span>
              <Sparkles className="w-4 h-4 text-[#e2a76f]" />
            </h3>
            <span className="text-xs text-[#e2a76f]/70 font-mono">
              Scrapbook Collection
            </span>
          </div>

          <PhotoUploader
            category="scrapbook"
            label={activeCategory.label}
            photos={photos}
            onAddPhotos={onAddPhotos}
            onDeletePhoto={onDeletePhoto}
            onOpenPhoto={onOpenPhoto}
            placeholderText={`Add to ${activeCategory.label} 📷`}
          />
        </div>
      </div>
    </section>
  );
};
