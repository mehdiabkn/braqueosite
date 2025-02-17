import React from 'react';
import { Dialog } from './ui/dialog';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemId: string;
}

export function PaymentModal({ isOpen, onClose, onConfirm, itemId }: PaymentModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Accéder aux informations de contact</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-gray-300 mb-4">
            Pour accéder aux informations de la personne ayant trouvé cet objet, un paiement unique de 8,90€ est requis.
          </p>
          
          <div className="bg-gray-800 p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Ce que vous obtiendrez :</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Les coordonnées complètes du trouveur</li>
              <li>• La description détaillée de l'objet</li>
              <li>• L'accès aux photos en haute qualité</li>
              <li>• La localisation précise</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={onConfirm}
          >
            Payer 8,90€
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}